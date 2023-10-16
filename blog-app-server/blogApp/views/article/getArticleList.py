from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from blogApp.models.article.article import Article

response_article_size = 12


class GetArticleListView(APIView):
    
    permission_classes = ([IsAuthenticated])

    def get(self, request):
        data = request.GET
        user = request.user
        
        current_count = data.get("current_count", '0').strip();
        
        if current_count.isdigit():
            current_count = int(current_count)

        articles = Article.objects.filter(articleUser__user = user).order_by('-articleCreateTime')[current_count:current_count + response_article_size]

        resp = []
        for article in articles:
            
            time = article.articleCreateTime
            time = timezone.localtime(time)
            time = time.strftime("%Y-%m-%d %H:%M")

            resp.append({
                'author': article.articleUser.user.username,
                'title': article.articleTitle,
                'keywords': article.articleKeyWords,
                'brief': article.articleBrief,
                'time': time,
                'aid': article.articleId,
                'visible': article.articleVisible,
            })
        
        if len(resp) == 0:
            return Response({
                'result': "已经到底了",
            })

        article_count = min(response_article_size, len(resp))

        return Response({
            'result': "success",
            'article_size': article_count,
            'articles': resp,
        })
