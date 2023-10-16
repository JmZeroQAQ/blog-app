import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from blogApp.models.user.user import BlogUser
from blogApp.models.article.article import Article

class CreateArticleView(APIView):
    permission_classes = ([IsAuthenticated])

    def post(self, request):
        data = request.POST
        user = request.user
        
        title = data.get("title", "").strip()
        content = data.get("content", "").strip()
        brief = data.get("brief", "").strip()
        keywords = data.get("keywords", "").strip()
        visible = data.get("visible", "all").strip()

        if len(content) >= 100010:
            return Response({
                'result': "文章太大了!",
            })

        if not title or not content:
            return Response({
                'result': "标题或者内容为空!",
            })

        if not keywords or not brief:
            return Response({
                'result': "关键字或者内容为空!",
            })

        try:
            blogUser = BlogUser.objects.get(user = user)
        except Exception:
            print(Exception)
            return Response({
                'result': "无法获取用户对象",
            })
        
        if blogUser.articleDir == "none":
            try:
                userFileDir = blogUser.userFileDir
                articleDir = os.path.join(userFileDir, "article")
                os.mkdir(articleDir)
                os.chown(articleDir, 1000, 1000)
                blogUser.articleDir = articleDir
                blogUser.save()
            except OSError:
                print("createArticle mkdir failed")

                return Response({
                    'result': "服务器错误",
                })
            except Exception:
                print("createArticle mkdir failed")
                return Response({
                    'result': "服务器错误",
                })
        
        article = Article.objects.create(articleUser = blogUser)

        articleDir = blogUser.articleDir
        articleContentDir = os.path.join(articleDir, str(article.articleId))

        with open(articleContentDir, "w+", encoding = "utf-8") as f:
            try:
                f.write(content)
            except Exception:
                print("createArticle write content failled")
                f.close()
                article.delete()

                return Response({
                    'result': "创建文章失败",
                })
            else: 
                f.close()
        
        article.articleTitle = title
        article.articleKeyWords = keywords
        article.articleBrief = brief
        article.articleVisible = visible
        article.articleContent = articleContentDir
        
        article.save()
        
        return Response({
            'result': "success",
            'articleId': article.articleId
        })


