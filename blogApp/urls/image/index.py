from django.urls import path
from blogApp.views.image.imageUpload import ImageUploadView
from blogApp.views.image.getImageList import GetImageListView
from blogApp.views.image.deleteImage import DeleteImageView
from blogApp.views.image.getUserImageInfo import GetUserImageInfoView
from blogApp.views.image.articleImageUpload import ArticleImageUploadView
from blogApp.views.image.avatarImage import AvatarImageView
from blogApp.views.image.homeImageUpload import HomeImageUploadView

urlpatterns = [
    path('upload/', ImageUploadView.as_view(), name = "image_upload"),
    path('getImageList/', GetImageListView.as_view(), name = "image_getImageList"),
    path('deleteImage/', DeleteImageView.as_view(), name = "image_deleteImage"),
    path('getUserImageInfo/', GetUserImageInfoView.as_view(), name = "image_getUserImageInfo"),
    path('articleImageUpload/', ArticleImageUploadView.as_view(), name = "image_articleImageUpload"),
    path('setAvatar/', AvatarImageView.as_view(), name = "image_setAvatar"),
    path('homeImageUpload/', HomeImageUploadView.as_view(), name = "image-homeImageUpload"),
]
