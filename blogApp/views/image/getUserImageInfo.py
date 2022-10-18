from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from blogApp.models.user.user import BlogUser
from blogApp.models.image.image import Image

class GetUserImageInfoView(APIView):
    permission_classes = ([IsAuthenticated])

    def get(self, request):
        user = request.user

        user = BlogUser.objects.filter(user = user)[0]
        imageMaxSize = round(user.imageMaxSize, 2)
        imageCurrentSize = round(user.imageCurrentSize, 2)
        imageCount = len(Image.objects.filter(imageUser = user))

        return Response({
            'result': "success",
            'imageMaxSize': imageMaxSize,
            'imageCurrentSize': imageCurrentSize,
            'imageCount': imageCount,
            })
