from .views import CategoryListCreateAPI, PostListCreateAPI, PostdetailAPI
from django.urls import path

urlpatterns = [
    path("categories/", CategoryListCreateAPI.as_view(), name="category-list-create"),
    path("posts/", PostListCreateAPI.as_view(), name="post-list-create"),
    path("posts/<int:pk>/", PostdetailAPI.as_view(), name="post-detail"),
]
