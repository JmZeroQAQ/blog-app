from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from blogApp.models.image.image import Image
from blogApp.models.user.user import BlogUser

class ArticleImageUploadView(APIView):
    permission_classes = ([IsAuthenticated])

    def post(self, request):
        user = request.user
        data = request.FILES
        imageFile = data.get('file', "")

        if not imageFile:
            return Response({
                'result': "图片内容为空!",
                })
        
        if imageFile.size > 1 * 1024 * 1024: # Unit Byte
            return Response({
                'result': "文件太大了!",
                })

        filename = imageFile.name
        fileType = filename.split('.', 1)[1]

        if fileType not in["jpg", "jpeg", "png", "gif"]:
            return Response({
                'result': "图片类型不支持!",
                })
        
        imageUser = BlogUser.objects.filter(user = user)[0]
        # 上传的是文章里面的图片，类别是articleImage
        image = Image.objects.create(imageUser = imageUser, imageFile = imageFile, imageName = filename, imageVisible = False, imageType = "articleImage")
        
        imageFileName = image.imageFile.name
        imageFileName = imageFileName.split('/')[-1]
        image.imageFileName = imageFileName
        image.save()

        return Response({
            'result': "success",
            "imageUrl": str(image.imageFile.url),
            })
