import os
import time
import random
from django.db import models
from blog.settings import MEDIA_ROOT
from django.db.models.signals import post_delete
from django.dispatch import receiver
from blogApp.models.user.user import BlogUser

def imagePath(instance, filename):
    filetype = filename.split('.', 1)[1]
    filename = time.strftime('%Y%m%d%H%M%S')
    filename += '%d' % random.randint(0, 100)
    return 'images/' + filename + "." + filetype
 
class Image(models.Model):
    # 图片名字
    imageName = models.CharField(max_length = 100, default = "", blank = True, null = True)
    # 图片所属用户
    imageUser = models.ForeignKey('BlogUser', on_delete = models.CASCADE)
    # 被装饰的图片源文件
    imageFile = models.ImageField(verbose_name = "图片地址", upload_to = imagePath)
    # 图片唯一ID
    imageId = models.BigAutoField(primary_key = True)
    # 图片创建时间
    imageCreateTime = models.DateTimeField(auto_now_add = True, blank = True, null = True)
    # 文件在图床是否显示
    imageVisible = models.BooleanField(default = True)
    # 文件类别, 默认是normal, 首页上传的图片是homeImage, 头像是avatar
    imageType = models.CharField(max_length = 20, default = "normal")
    # 图片储存在本地的名字
    imageFileName = models.CharField(verbose_name = "文件名字", max_length = 128, default = "")

    def __str__(self):
        return str(self.imageName)

# 对删除信号添加对应的处理函数
# 在图片实例被删除的时候，将本地的图片也删除
@receiver(post_delete, sender = Image)
def delete_upload_images(sender, instance, **kwargs):
    imageDir = os.path.join(MEDIA_ROOT, instance.imageFile.path)
    imageVisible = instance.imageVisible
    imageSize = round(instance.imageFile.size / 1024 / 1024, 3) # Unit: MB
    imageUser = instance.imageUser

    if os.path.exists(imageDir):
        try:
            os.remove(imageDir)
        except Exception:
            print(Exception)
            print("Image models delete_upload_images error")
        else:
            if imageVisible == True:# 图片在用户图床里，维护对应内存大小
                imageCurrentSize = round(imageUser.imageCurrentSize, 3)
                imageCurrentSize -= imageSize
                imageUser.imageCurrentSize = imageCurrentSize
                imageUser.save()

