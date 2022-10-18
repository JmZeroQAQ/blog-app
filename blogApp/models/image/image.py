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
    imageName = models.CharField(max_length = 100, default = "", blank = True, null = True)
    imageUser = models.ForeignKey('BlogUser', on_delete = models.CASCADE)
    imageFile = models.ImageField(verbose_name = "图片地址", upload_to = imagePath)
    imageId = models.BigAutoField(primary_key = True)
    imageCreateTime = models.DateTimeField(auto_now_add = True, blank = True, null = True)
    imageVisible = models.BooleanField(default = True)
    imageType = models.CharField(max_length = 20, default = "normal")
    imageFileName = models.CharField(verbose_name = "文件名字", max_length = 128, default = "")

    def __str__(self):
        return str(self.imageName)

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

