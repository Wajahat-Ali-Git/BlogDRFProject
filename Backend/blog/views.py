from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count
from django.db.models import F

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
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        queryset = Post.objects.filter(is_published=True)

        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category__slug=category)

        return queryset

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


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

        return super().retrieve(request, *args, **kwargs)


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
