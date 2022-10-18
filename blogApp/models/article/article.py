import os
from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver
from blogApp.models.user.user import BlogUser

class Article(models.Model):
    articleUser = models.ForeignKey('BlogUser', on_delete = models.CASCADE)
    
    articleId = models.BigAutoField(primary_key = True)

    articleTitle = models.CharField(default = '', max_length = 55, blank = True, null = True)

    articleContent = models.CharField(default = '', max_length = 1000, blank = True, null = True)

    articleKeyWords = models.CharField(default = '', max_length = 12, blank = True, null = True)

    articleBrief = models.CharField(default = '', max_length = 32, blank = True, null = True)

    articleVisible = models.CharField(default = 'all', max_length = 10)

    articleCreateTime = models.DateTimeField(auto_now = True)

    articleType = models.CharField(default = '文章', max_length = 10)

    def __str__(self):
        return str(self.articleTitle)

@receiver(post_delete, sender = Article)
def delete_article(sender, instance, **kwargs):
    articleDir = instance.articleContent
    
    if os.path.exists(articleDir):
        try:
            os.remove(articleDir)
        except Exception:
            print(Exception)
            print("Article delete article: delete article error")
    
    return 
