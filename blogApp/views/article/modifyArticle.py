from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from blogApp.models.article.article import Article

class ModifyArticleView(APIView):
    
    permission_classes = ([IsAuthenticated])

    def post(self, request):
        data = request.POST
        user = request.user

        articleId = data.get("articleId", "0").strip()
        if articleId.isdigit():
            articleId = int(articleId)
        else:
            return Response({
                'result': "文章不存在!",
            })

        if not Article.objects.filter(articleId = articleId).exists():
            return Response({
                'result': "文章不存在!",
            })

        article = Article.objects.filter(articleId = articleId)[0]
        
        # identity check
        if article.articleUser.user != user:
            return Response({
                'result': "用户验证不通过!",
            })

        title = data.get("title", "").strip()
        keywords = data.get("keywords", "").strip()
        brief = data.get("brief", "").strip()
        content = data.get("content", "").strip()
        visible = data.get("visible", "").strip()

        if len(content) >= 100010:
            return Response({
                'result': "文章太大了!",
            })

        if not title or not keywords:
            return Response({
                'result': "标题或关键字为空!",
            })

        if not brief or not content:
            return Response({
                'result': "文章内容为空!",
            })

        # update article
        article.articleTitle = title
        article.articleKeyWords = keywords
        article.articleBrief = brief
        article.articleVisible = visible
        
        # get article dir
        articleContentDir = article.articleContent
        
        with open(articleContentDir, "w+", encoding = "utf-8") as f:
            try:
                f.write(content)
            except Exception:
                print("modifyArticle: write content failled")
                print(Exception)
                f.close()

                return Response({
                    'result': "写入文章失败!",
                })
            else:
                f.close()
        
        article.save()

        return Response({
            'result': "success",
        })

