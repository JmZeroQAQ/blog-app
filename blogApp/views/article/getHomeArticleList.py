from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from blogApp.models.article.article import Article

class GetHomeArticleListView(APIView):
    
    def get(self, request):
        articles = Article.objects.filter(articleVisible = "all").order_by('-articleCreateTime')[0 : 10]

        resp = []
        for article in articles:
            time = article.articleCreateTime
            time = timezone.localtime(time)
            time = time.strftime("%Y-%m-%d %H:%M")
            
            content = ""
            try:
                with open(article.articleContent, "r", encoding = "utf-8") as f:
                    content = f.read()
            except Exception:
                print("getHomeArticleListView: open article Error")
                
                return Response({
                    'result': "打开文章失败",
                    })
            else: 
                f.close()
            
            resp.append({
                'username': article.articleUser.user.username,
                'avatarUrl': article.articleUser.avatarUrl,
                'title': article.articleTitle,
                'content': content,
                'time': time,
                'aid': article.articleId,
                'type': article.articleType,
                })
        
        return Response({
            'result': "success",
            'articles': resp,
            })
