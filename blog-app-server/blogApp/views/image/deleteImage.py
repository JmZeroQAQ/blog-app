from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from blogApp.models.image.image import Image

class DeleteImageView(APIView):
    permission_classes = ([IsAuthenticated])

    def get(self, request):
        user = request.user
        data = request.GET

        imageId = data.get("imageId", "-1").strip()
        if imageId.isdigit():
            imageId = int(imageId)
        else:
            return Response({
                'result': "图片不存在!",
                })

        if imageId == -1:
            return Response({
                'result': "图片不存在!",
                })

        image = Image.objects.filter(imageId = imageId)
        if not image.exists():
            return Response({
                'result': "图片不存在!",
                })

        image = image[0]
        
        try:
            image.delete()
        except Exception:
            print(Exception)
            print("DeleteImageView image.delete() failled")
            return Response({
                'result': "删除图片失败！"
                })

        return Response({
            'result': "success",
        })
