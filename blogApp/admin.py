from django.contrib import admin
from blogApp.models.user.user import BlogUser
from blogApp.models.article.article import Article
from blogApp.models.image.image import Image

class ArticleTools(admin.ModelAdmin):
    list_display = ('articleTitle', 'articleUser', 'articleCreateTime')
    search_fields = ('articleTitle', 'articleUser__user__username')
    list_filter = ('articleUser__user__username', )

class ImageTools(admin.ModelAdmin):
    list_display = ('imageName', 'imageUser', 'imageVisible')

# Register your models here.

admin.site.register(BlogUser)
admin.site.register(Article, ArticleTools)
admin.site.register(Image, ImageTools)
