from django.urls import path
from blogApp.views.user.register import RegisterView
from blogApp.views.user.getUserInfo import GetUserInfoView
from blogApp.views.user.setUserInfo import SetUserInfoView

urlpatterns = [
    path('register/', RegisterView.as_view(), name = "user_register"),
    path('getinfo/', GetUserInfoView.as_view(), name = "user_getinfo"),
    path('setinfo/', SetUserInfoView.as_view(), name = "user_setInfo"),
]
