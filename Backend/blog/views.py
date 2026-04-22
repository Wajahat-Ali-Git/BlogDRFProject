from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count
from django.db.models import F
from rest_framework import status
from .utils.translate import translate_text

from .models import Post, Category, Like
from .serializers import PostSerializer, CategorySerializer


# -------------------------
# Custom Permission
# -------------------------
class IsAuthorOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user


# -------------------------
# Supported languages & shared translation helper
# -------------------------
SUPPORTED_LANGS = ["ur", "hi", "ar", "zh"]


def _translate_post_list(queryset, data, lang):
    """
    Translate title + content for every post in `data`.
    Uses the per-post DB cache (Post.translations) to avoid re-hitting
    the translation API for posts that were already translated.
    Saves newly translated posts back to the DB in a bulk update.
    """
    # Build a pk → Post instance map for cache look-ups & bulk saves
    posts_by_id = {post.pk: post for post in queryset}
    to_save = []  # posts whose translations cache needs to be written back

    data = list(data)  # make mutable
    for item in data:
        post = posts_by_id.get(item["id"])
        if not post:
            continue

        translations = post.translations or {}

        if lang in translations:
            # ✅ cache hit — no API call needed
            item["title"] = translations[lang]["title"]
            item["content"] = translations[lang]["content"]
        else:
            # 🔥 translate and cache
            translated_title = translate_text(post.title, lang)
            translated_content = translate_text(post.content, lang)

            translations[lang] = {
                "title": translated_title,
                "content": translated_content,
            }
            post.translations = translations
            to_save.append(post)

            item["title"] = translated_title
            item["content"] = translated_content

    # Bulk-save only the posts whose cache changed
    if to_save:
        Post.objects.bulk_update(to_save, ["translations"])

    return data


# -------------------------
# Category APIs
# -------------------------
class CategoryListCreateAPI(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# -------------------------
# Posts APIs
# -------------------------
class PostListCreateAPI(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get_queryset(self):
        queryset = Post.objects.filter(is_published=True)

        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category__slug=category)

        return queryset

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data

        lang = request.query_params.get("lang")
        if lang and lang != "en":
            if lang not in SUPPORTED_LANGS:
                return Response(
                    {"error": "Language not supported"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            data = _translate_post_list(queryset, data, lang)

        return Response(data)


# -------------------------
# Post Detail API (ADD VIEW COUNT HERE)
# -------------------------


class PostdetailAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        IsAuthorOrReadOnly,
    ]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        # 🔥 increment views safely
        instance.views = F("views") + 1
        instance.save(update_fields=["views"])
        instance.refresh_from_db()  # ✅ important to get updated value

        # serialize data
        data = self.get_serializer(instance).data

        # 🌍 get requested language
        lang = request.query_params.get("lang")

        if lang and lang != "en":
            # ❌ optional: restrict languages
            if lang not in SUPPORTED_LANGS:
                return Response(
                    {"error": "Language not supported"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            translations = instance.translations or {}

            # ✅ if already translated → use cache
            if lang in translations:
                data["title"] = translations[lang]["title"]
                data["content"] = translations[lang]["content"]

            else:
                # 🔥 translate now
                translated_title = translate_text(instance.title, lang)
                translated_content = translate_text(instance.content, lang)

                # 💾 save translation (cache)
                translations[lang] = {
                    "title": translated_title,
                    "content": translated_content,
                }
                instance.translations = translations
                instance.save(update_fields=["translations"])

                # override response
                data["title"] = translated_title
                data["content"] = translated_content

        return Response(data)


# -------------------------
# Like / Unlike Toggle API
# -------------------------
class ToggleLikeAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=404)

        user = request.user

        like, created = Like.objects.get_or_create(user=user, post=post)

        if not created:
            like.delete()
            return Response({"liked": False, "message": "Unliked"})

        return Response({"liked": True, "message": "Liked"})


# -------------------------
# Popular Posts API 🔥
# -------------------------
class PopularPostsAPI(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return (
            Post.objects.filter(is_published=True)
            .annotate(likes_count=Count("likes"))
            .order_by("-likes_count", "-views")[:10]
        )

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data

        lang = request.query_params.get("lang")
        if lang and lang != "en":
            if lang not in SUPPORTED_LANGS:
                return Response(
                    {"error": "Language not supported"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            data = _translate_post_list(queryset, data, lang)

        return Response(data)
