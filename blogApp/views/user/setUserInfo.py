from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from blogApp.models.user.user import BlogUser

class SetUserInfoView(APIView):
    permission_classes = ([IsAuthenticated])

    def post(self, request):
        user = request.user
        data = request.POST

        username = data.get('username', "").strip()
        backgroundUrl = data.get('backgroundUrl', "").strip()

        if len(username) > 25 or len(backgroundUrl) > 256:
            return Response({
                'result': "非法昵称或背景!",
                })

        if User.objects.filter(username = username).exists():
            return Response({
                'result': "该用户名已经被使用",
                })

        blogUser = BlogUser.objects.filter(user = user)[0]
        blogUser.backgroundUrl = backgroundUrl
        blogUser.save()

        user = blogUser.user
        user.username = username
        user.save()

        return Response({
            'result': "success",
            })
