from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from blogApp.models.image.image import Image
from blogApp.models.user.user import BlogUser
from blogApp.views.image_utils.resizeImage import resizeImage

class ImageUploadView(APIView):
    permission_classes = ([IsAuthenticated])

    def post(self, request):
        user = request.user
        data = request.FILES
        imageFile = data.get('file', "")

        if not imageFile:
            return Response({
                'result': "没有找到该图片!",
            })
        
        filename = imageFile.name
        fileType = filename.split('.', 1)[1]

        if fileType not in["jpg", "jpeg", "gif", "png"]:
            return Response({
                "result": "图片类型不支持!",
            })

        if imageFile.size < 1024:
            return Response({
                'result': "文件太小了!",
            })

        if imageFile.size > 10 * 1024 * 1024: # Unit Byte
            return Response({
                'result': "文件太大了!",
                })
        
        fileSize = imageFile.size / 1024 / 1024 # Unit MB
        fileSize = round(fileSize, 3)

        imageUser = BlogUser.objects.filter(user = user)[0]
        imageMaxSize = imageUser.imageMaxSize
        imageCurrentSize = round(imageUser.imageCurrentSize, 3)

        if imageCurrentSize + fileSize > imageMaxSize:
            return Response({
                'result': "用户内存不足!",
            })
        
        # 维护用户所使用的内存空间
        imageCurrentSize += fileSize
        imageUser.imageCurrentSize = round(imageCurrentSize, 3)
        imageUser.save()
        # 获取缩略图
        thumbnail = self.createThumbnail(imageFile)
        # 生成模型实例
        image = Image.objects.create(imageUser = imageUser, imageFile = imageFile, imageName = filename, imageThumbnail = thumbnail)
        
        imageFileName = image.imageFile.name
        imageFileName = imageFileName.split('/')[-1]

        image.imageFileName = imageFileName
        image.save()

        return Response({
            'result': "success",
        })


    def createThumbnail(self, file):
        output = resizeImage(file = file, max_height = 200)
        return output
