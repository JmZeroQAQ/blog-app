from django.db import models
from django.contrib.auth.models import User

class BlogUser(models.Model):
    # 与django用户一对一映射
    user = models.OneToOneField(User, on_delete = models.CASCADE)
    # 用户文件地址
    userFileDir = models.CharField(default = 'none', max_length = 55)
    # 文章目录地址
    articleDir = models.CharField(default = 'none', max_length = 85)
    
    # 用户储存空间大小
    imageMaxSize = models.FloatField(default = 200.00, blank = True, null = True)
    # 用户已用空间大小
    imageCurrentSize = models.FloatField(default = 0.00, blank = True, null = True)
    
    # 头像及其缩略图地址
    avatarUrl = models.CharField(max_length = 256, default = "/media/images/2022100822521821.png")
    avatarThumbnail = models.CharField(max_length = 256, blank = True, null = True)
    # 背景图片地址
    backgroundUrl = models.CharField(max_length = 256, default = "", blank = True, null = True)

    def __str__(self):
        return str(self.user)
