from .views import (
    CategoryListCreateAPI,
    PostListCreateAPI,
    PostdetailAPI,
    ToggleLikeAPI,
    PopularPostsAPI,
)
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("categories/", CategoryListCreateAPI.as_view(), name="category-list-create"),
    path("posts/", PostListCreateAPI.as_view(), name="post-list-create"),
    path("posts/<int:pk>/", PostdetailAPI.as_view(), name="post-detail"),
     # 🔥 popular posts
    path("posts/popular/", PopularPostsAPI.as_view()),
    path("posts/<int:post_id>/like/", ToggleLikeAPI.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
