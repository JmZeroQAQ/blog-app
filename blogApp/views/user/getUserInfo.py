from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from blogApp.models.user.user import BlogUser

class GetUserInfoView(APIView):
    permission_classes = ([IsAuthenticated])

    def get(self, request):
        user = request.user
        
        try:
            blogUser = BlogUser.objects.get(user = user)
        except Exception:
            print(Exception)
            print("getUserInfo Exception")
            return Response({
                'result': "获取用户信息失败",
            })
        
        # 用户名字
        username = blogUser.user.username
        # 用户头像地址
        avatarUrl = blogUser.avatarUrl
        # 用户头像缩略图
        avatarThumbnail = blogUser.avatarThumbnail
        # 用户背景地址
        backgroundUrl = blogUser.backgroundUrl
        if avatarThumbnail == None:
            avatarThumbnail = avatarUrl

        return Response({
            'result': "success",
            'username': username,
            'avatarUrl': avatarUrl,
            'avatarThumbnail': avatarThumbnail,
            'backgroundUrl': backgroundUrl,
        })
