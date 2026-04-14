from .views import CategoryListCreateAPI, PostListCreateAPI, PostdetailAPI
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("categories/", CategoryListCreateAPI.as_view(), name="category-list-create"),
    path("posts/", PostListCreateAPI.as_view(), name="post-list-create"),
    path("posts/<int:pk>/", PostdetailAPI.as_view(), name="post-detail"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
