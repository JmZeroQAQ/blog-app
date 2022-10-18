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

        return Response({
            'result': "success",
            'username': blogUser.user.username,
            'avatarUrl': blogUser.avatarUrl,
            'backgroundUrl': blogUser.backgroundUrl,
        })
