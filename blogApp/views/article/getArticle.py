from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from blogApp.models.article.article import Article
from django.core.cache import cache

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
        

        # 访问redis看是否缓存了这篇文章
        # 如果缓存了，直接从redis获取数据返回
        keys = cache.keys('*-%d' % articleId)
        if keys:
            key = keys[0]
            article_cache = cache.get(key)
            # 文章信息
            username = article_cache['username']
            title = article_cache['title']
            keywords = article_cache['keywords']
            brief = article_cache['brief']
            content = article_cache['content']
            time = article_cache['time']
            visible = article_cache['visible']
            
            return Response({
                'result': "success",
                'username': username,
                'title': title,
                'keywords': keywords,
                'brief': brief,
                'content': content,
                'time': time,
                'visible': visible,
            })


        try:
            article = Article.objects.get(articleId = articleId)
        except Exception:
            print("Article not exists!")
            return Response({
                'result': "文章不存在",
            })
        
        if article.articleVisible == "all":
            # 用户信息
            username = article.articleUser.user.username
            avatarThumbnail = article.articleUser.avatarThumbnail

            # 文章信息
            title = article.articleTitle
            content = ""
            brief = article.articleBrief
            keywords = article.articleKeyWords
            visible = "all"
            articleType = article.articleType
            articleId = articleId

            time = article.articleCreateTime
            time = timezone.localtime(time)
            time = time.strftime("%Y-%m-%d %H:%M")

            try:
                with open(article.articleContent, "r", encoding = "utf-8") as f:
                    content = f.read()
            except Exception:
                print("In getArticle open article Error")

                return Response({
                    'result': "打开文件失败",
                })
            else: 
                f.close()

            # 将文章缓存进redis
            article_cache = {
                    'username': username,
                    'avatarThumbnail': avatarThumbnail,
                    'title': title,
                    'content': content,
                    'brief': brief,
                    'keywords': keywords,
                    'visible': visible,
                    'time': time,
                    'articleType': articleType,
                    'articleId': articleId,
            }
            cache.set('%s-%d' % (username, articleId), article_cache, 24 * 3600) # 缓存一天
            
            # 返回资源
            return Response({
                'result': "success",
                'username': username,
                'title': title,
                'keywords': keywords,
                'brief': brief,
                'content': content,
                'time': time,
                'visible': visible,
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

