from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import redirect
from django.db.models import Q
from blogApp.models.article.article import Article

response_article_size = 12

class SearchArticleView(APIView):
    permission_classes = ([IsAuthenticated])

    def get(self, request):
        data = request.GET
        user = request.user

        search_value = data.get("searchValue", "").strip()
        current_count = data.get("current_count", "0").strip()

        if search_value == "":
            return redirect("article_getlist") # redirect to getlist url
        if current_count.isdigit():
            current_count = int(current_count)

        articles = Article.objects.filter(articleUser__user = user)

        articles = articles.filter(Q(articleTitle__contains = search_value) | Q(articleBrief__contains = search_value)
                | Q(articleKeyWords = search_value)).order_by('-articleCreateTime')[current_count : current_count + response_article_size]
        
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
                'result': "已经没有文章了!",
            })

        return Response({
            'result': "success",
            "article_size": response_article_size,
            "articles": resp,
            })
