from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from blogApp.models.user.user import BlogUser
from blogApp.utils.clearUserArticleCache import clearUserArticleCache

class SetUserInfoView(APIView):
    permission_classes = ([IsAuthenticated])

    def post(self, request):
        user = request.user
        data = request.POST

        username = data.get('username', "").strip()
        backgroundUrl = data.get('backgroundUrl', "").strip()
        
        if len(username) <= 3:
            return Response({
                'result': "非法昵称或者背景!",
                })

        if len(username) > 10 or len(backgroundUrl) > 256:
            return Response({
                'result': "非法昵称或背景!",
                })
        
        blogUser = BlogUser.objects.filter(user = user)[0]

        if username != user.username:
            if not User.objects.filter(username = username).exists():
                # 用户名字改变了,redis缓存里面对应的文章信息全部失效
                clearUserArticleCache(user.username)
                user.username = username
                user.save()
            else:
                return Response({
                    'result': "该用户名已经被使用",
                    })

        blogUser.backgroundUrl = backgroundUrl
        blogUser.save()


        return Response({
            'result': "success",
            })
