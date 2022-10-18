from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from blogApp.models.article.article import Article

class GetArticleView(APIView):

    def get(self, request):
        user = request.user
        data = request.GET
        
        articleId = data.get("articleId", "0").strip()
        if articleId.isdigit():
            articleId = int(articleId)
        else:
            return Response({
                'result': "文章不存在",
            })
        
        try:
            article = Article.objects.get(articleId = articleId)
        except Exception:
            print("Article not exists!")
            return Response({
                'result': "文章不存在",
            })
        
        if article.articleVisible == "all":
            content = ""
            time = article.articleCreateTime
            time = timezone.localtime(time)
            time = time.strftime("%Y-%m-%d %H:%M")

            try:
                with open(article.articleContent, "r", encoding = "utf-8") as f:
                    content = f.read()
            except Exception:
                print("open article Error")

                return Response({
                    'result': "打开文件失败",
                })
            else: 
                f.close()

            return Response({
                'result': "success",
                'username': article.articleUser.user.username,
                'title': article.articleTitle,
                'keywords': article.articleKeyWords,
                'brief': article.articleBrief,
                'content': content,
                'time': time,
                'visible': "all",
            })

        elif user == article.articleUser.user:
            content = ""
            time = article.articleCreateTime
            time = timezone.localtime(time)
            time = time.strftime("%Y-%m-%d %H:%M")

            try:
                with open(article.articleContent, "r", encoding = "utf-8") as f:
                    content = f.read()
            except Exception:
                print('open self articleContent failled')

                return Response({
                    'result': "获取文件失败",
                })
            else: 
                f.close()

            return Response({
                'result': "success",
                'username': article.articleUser.user.username,
                'title': article.articleTitle,
                'keywords': article.articleKeyWords,
                'brief': article.articleBrief,
                'content': content,
                'time': time,
                'visible': "self",
                })

        return Response({
            'result': "当前文章未公开",
        })

