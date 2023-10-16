import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from blogApp.models.article.article import Article
from blogApp.utils.clearArticleCache import clearArticleCache

class BatchOperateView(APIView):
    permission_classes = ([IsAuthenticated])

    def post(self, request):
        data = request.POST
        user = request.user

        articleIdSet = data.get("articleIdSet", "").strip()
        articleIdSet = json.loads(articleIdSet)
        operator = data.get("operator", "").strip()

        if len(articleIdSet) >= 1000:
            return Response({
                'result': "文章数量超出上限!",
            })

        if operator != 'delete' and operator != 'all' and operator != 'self':
            return Response({
                'result': "无效的操作!",
            })
        
        # 判断一下文章Id是否合法和做一下身份验证
        for articleId in articleIdSet:
            article = Article.objects.filter(articleId = articleId)
            if article.exists():
                article = article[0]
                if article.articleUser.user != user:
                    return Response({
                        'result': "用户验证不通过!",
                    })
            else:
                return Response({
                    'result': "有文章不存在!",
                })
        
        
        for articleId in articleIdSet:
            article = Article.objects.filter(articleId = articleId)
            if article.exists():
                article = article[0]

                if operator == 'delete':
                    self.deleteArticle(article = article, articleId = articleId)
                elif operator == 'all':
                    self.changeArticleScope(article = article, scope = 'all', articleId = articleId)
                elif operator == 'self':
                    self.changeArticleScope(article = article, scope = 'self', articleId = articleId)


        return Response({
            'result': "success",
        })

    def deleteArticle(self, article, articleId):
        try:
            article.delete()
        except Exception:
            print("batch delete article error")

            return Response({
                'result': "删除文章失败!"
                })
        else:
            # 清理redis中的缓存
            clearArticleCache(articleId)
        
    def changeArticleScope(self, article, scope, articleId):
        if article.articleVisible != scope:
            article.articleVisible = scope
            article.save()
            # 清理redis中的缓存
            clearArticleCache(articleId)
    
