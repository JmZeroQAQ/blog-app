from django.db import models
from django.contrib.auth.models import User

class BlogUser(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE)
    
    userFileDir = models.CharField(default = 'none', max_length = 55)

    articleDir = models.CharField(default = 'none', max_length = 85)
    
    imageMaxSize = models.FloatField(default = 200.00, blank = True, null = True)
    imageCurrentSize = models.FloatField(default = 0.00, blank = True, null = True)

    avatarUrl = models.CharField(max_length = 256, default = "/media/images/2022100822521821.png")
    backgroundUrl = models.CharField(max_length = 256, default = "", blank = True, null = True)

    def __str__(self):
        return str(self.user)
