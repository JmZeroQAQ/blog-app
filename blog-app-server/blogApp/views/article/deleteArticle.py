from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from blogApp.models.article.article import Article
from blogApp.utils.clearArticleCache import clearArticleCache

class DeleteArticleView(APIView):
    permission_classes = ([IsAuthenticated])

    def get(self, request):
        data = request.GET
        user = request.user

        articleId = data.get("articleId", "-1").strip()
        if articleId.isdigit():
            articleId = int(articleId)
        else:
            return Response({
                'result': "文章不存在!",
            })
    
        
        article = Article.objects.filter(articleId = articleId)
        if not article.exists():
            return Response({
                'result': "文章不存在!",
            })

        article = article[0]

        if user != article.articleUser.user:
            return Response({
                'result': "用户验证不通过!",
            })
        
        article.delete()
        # 查看这篇文章是否在redis中，如果在，把它删除
        clearArticleCache(articleId)

        return Response({
            'result': "success",
        })

