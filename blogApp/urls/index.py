from django.urls import path, include
from blogApp.views.index import index

urlpatterns = [
    path('', index, name = "index"),
    path('token/', include('blogApp.urls.token.index')),
    path('user/', include('blogApp.urls.user.index')),
    path('article/', include('blogApp.urls.article.index')),
    path('image/', include("blogApp.urls.image.index")),
]
