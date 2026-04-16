from rest_framework import generics, permissions
from .models import Post, Category
from .serializers import PostSerializer, CategorySerializer
from rest_framework.parsers import MultiPartParser, FormParser

from rest_framework.permissions import BasePermission
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Like, Post


class IsAuthorOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user


# Category APIs
class CategoryListCreateAPI(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# POSTS APIs
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


class PostdetailAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

class ToggleLikeAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        user = request.user
        post = Post.objects.get(id=post_id)

        like, created = Like.objects.get_or_create(user= user, post=post)
        if not created :
            like.delete()
            return Response({"message": "Unliked"})
        return Response({"message": "Liked"})


