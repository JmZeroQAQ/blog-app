import os
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from blogApp.models.user.user import BlogUser

class RegisterView(APIView):
    def post(self, request):
        data = request.POST

        username = data.get("username", "").strip()
        password = data.get("password", "").strip()
        password_confirm = data.get("password_confirm", "").strip()

        if not username or not password:
            return Response({
                'result': "用户名和密码不能为空",
            })

        if password != password_confirm:
            return Response({
                'result': "两次密码不一致",
            })

        if User.objects.filter(username = username).exists():
            return Response({
                'result': "用户名已存在",
            })
        
        user = User(username = username)
        user.set_password(password)
        user.save()
        
        userStorageDir = os.path.join(settings.BASE_DIR, "UserStorage")
        userFileDir = os.path.join(userStorageDir, str(user.id))
        
        try:
            if not os.path.exists(userFileDir):
                os.mkdir(userFileDir)
                os.chown(userFileDir, 1000, 1000)
        except OSError:
            print(OSError)
            print("Register Exception")
            return Response({
                'result': "创建文件夹错误",
            })
        except Exception:
            print(Exception)
            print("Register Exception")
            return Response({
                'result': "创建文件夹错误",
            })

        BlogUser.objects.create(user = user, userFileDir = userFileDir)

        return Response({
            'result': "success",
        })
