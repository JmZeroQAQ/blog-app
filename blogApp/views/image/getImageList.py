from django.utils import timezone
from blog.settings  import MEDIA_URL
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from blogApp.models.user.user import BlogUser
from blogApp.models.image.image import Image

response_image_count = 8

class GetImageListView(APIView):
    permission_classes = ([IsAuthenticated])

    def get(self, request):
        data = request.GET
        user = request.user

        currentCount = data.get("currentCount", "0").strip()
        if currentCount.isdigit():
            currentCount = int(currentCount)
        else:
            return Response({
                'result': "currentCount was unvalid!",
                })
        
        images = Image.objects.filter(imageUser__user = user, imageVisible = True).order_by('-imageCreateTime')[currentCount : currentCount + response_image_count]

        resp = []
        for image in images:
            imageId = image.imageId
            imageUrl = str(image.imageFile.url)
            thumbnailUrl = str(image.imageThumbnail.url)
            imageSize = round(image.imageFile.size / 1024 / 1024, 2)
            createTime = image.imageCreateTime
            createTime = timezone.localtime(createTime)
            createTime = createTime.strftime("%Y-%m-%d %H:%M")

            resp.append({
                'imageId': imageId,
                'imageUrl': imageUrl,
                'thumbnailUrl': thumbnailUrl,
                'imageSize': imageSize,
                'imageCreateTime': createTime,
            })

        responseCount = len(resp)
        if responseCount == 0:
            return Response({
                'result': "已经到底了!",
                })

        return Response({
            'result': "success",
            'images': resp,
            'responseCount': responseCount,
        })
