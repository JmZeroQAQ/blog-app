from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from blogApp.models.user.user import BlogUser
from blogApp.models.image.image import Image
from blogApp.views.image_utils.resizeImage import resizeImage
from blogApp.utils.clearUserArticleCache import clearUserArticleCache

class AvatarImageView(APIView):
    permission_classes = ([IsAuthenticated])

    def post(self, request):
        user = request.user
        data = request.FILES
        imageFile = data.get('file', "")

        if not imageFile:
            return Response({
                'result': "图片内容为空!",
                })

        if imageFile.size > 10 * 1024 * 1024:
            return Resopnse({
                'result': "文件太大了!",
                })

        filename = imageFile.name
        if filename != 'blob':
            return Response({
                'result': "请上传正确格式图片!",
                })
        imageFile.name = filename = 'avatar.png'

        if filename.find('.') == -1:
            return Response({
                'result': "请上传正确格式图片!",
                })
        
        fileType = filename.split('.', 1)[1]
        if fileType not in["jpg", "jpeg", "png", "gif"]:
            return Response({
                'result': "图片类型不支持!",
                })
        
        # 获取压缩后的图片
        thumbnail = resizeImage(file = imageFile, max_height = 65)

        imageUser = BlogUser.objects.filter(user = user)[0]
        # 上传的是头像，类别是avatar
        image = Image.objects.create(imageUser = imageUser, imageFile = imageFile, imageName = filename, imageVisible = False, imageType = "avatar", imageThumbnail = thumbnail)

        imageFileName = image.imageFile.name
        imageFileName = imageFileName.split('/')[-1]
        image.imageFileName = imageFileName
        image.save()

        imageUser.avatarUrl = str(image.imageFile.url)
        imageUser.avatarThumbnail = str(image.imageThumbnail.url)
        imageUser.save()

        # 头像修改了,用户在redis缓存对应的文章全部失效
        clearUserArticleCache(imageUser.user.username)

        return Response({
            'result': "success",
            })

