import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from blogApp.models.user.user import BlogUser
from blogApp.models.image.image import Image
from blogApp.models.article.article import Article

class HomeImageUploadView(APIView):
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
        fileType = filename.split('.', 1)[1]

        if fileType not in["jpg", "jpeg", "png", "gif"]:
            return Response({
                'result': "图片类型不支持!",
                })

        imageUser = BlogUser.objects.filter(user = user)[0]
        image = Image.objects.create(imageUser = imageUser, imageFile = imageFile, imageName = filename, imageVisible = False, imageType = "homeImage")
        
        imageFileName = image.imageFile.name
        imageFileName = imageFileName.split('/')[-1]
        image.imageFileName = imageFileName
        image.save()

        imageUrl = image.imageFile.url
        content = "![]" + "(https://ranunculus.top" + imageUrl + ")"
        keywords = "图片分享"
        title = "图片分享"
        articleType = "分享"

        # 文章作者
        blogUser = imageUser
        if blogUser.articleDir == "none":
            try:
                userFileDir = blogUser.userFileDir
                articleDir = os.path.join(userFileDir, "article") # 存储文章所在的文件夹
                os.mkdir(articleDir)
                os.chown(articleDir, 1000, 1000) # 修改文件夹的用户组
                blogUser.articleDir = articleDir # 将这个文件夹地址写入数据库
                blogUser.save()
            except Exception:
                print("homeImageUpload mkdir failled")

                return Response({
                    'result': "服务器错误",
                    })
        
        article = Article.objects.create(articleUser = blogUser)
        articleDir = blogUser.articleDir
        articleContentDir = os.path.join(articleDir, str(article.articleId)) # 文章的完整地址,存储在Article表

        with open(articleContentDir, "w+", encoding = "utf-8") as f:
            try:
                f.write(content)
            except Exception:
                print("homeImageUpload write content failler")
                f.close()
                article.delete()

                return Response({
                    'result': "创建文章失败",
                    })
            else:
                f.close()

        article.articleTitle = title
        article.articleKeyWords = keywords
        article.articleVisible = "all"
        article.articleContent = articleContentDir
        article.articleType = articleType

        article.save()


        return Response({
            'result': "success",
            })
