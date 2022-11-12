from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from blogApp.models.article.article import Article
from django.core.cache import cache

class GetHomeArticleListView(APIView):
    
    def get(self, request):
        articles = Article.objects.filter(articleVisible = "all").order_by('-articleCreateTime')[0 : 10]

        resp = []
        for article in articles:
            # 先获取文章ID
            articleId = article.articleId

            # 访问redis看是否缓存了这篇文章
            # 如果缓存了，直接从redis获取数据
            keys = cache.keys('*-%d' % articleId)
            if keys:
                key = keys[0]
                article_cache = cache.get(key)
                # 用户信息
                username = article_cache['username']
                # 用户缩略图
                avatarThumbnail = article_cache['avatarThumbnail']

                # 文章信息
                title = article_cache['title']
                content = article_cache['content']
                time = article_cache['time']
                articleId = article_cache['articleId']
                articleType = article_cache['articleType']
                resp.append({
                    'username': username,
                    'avatarUrl': avatarThumbnail,
                    'title': title,
                    'content': content,
                    'time': time,
                    'aid': articleId,
                    'type': articleType,
                })
                continue # 获取下一篇文章

            # 用户信息
            username = article.articleUser.user.username
            # 文章信息
            title = article.articleTitle
            content = ""
            brief = article.articleBrief
            keywords = article.articleKeyWords
            visible = "all"
            articleType = article.articleType

            time = article.articleCreateTime
            time = timezone.localtime(time)
            time = time.strftime("%Y-%m-%d %H:%M")

            # 用户缩略图
            avatarThumbnail = article.articleUser.avatarThumbnail
            if avatarThumbnail == None:
                avatarThumbnail = article.articleUser.avatarUrl
            
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
            
            resp.append({
                'username': username,
                'avatarUrl': avatarThumbnail,
                'title': title,
                'content': content,
                'time': time,
                'aid': articleId,
                'type': articleType,
                })
        
        # 返回数据
        return Response({
            'result': "success",
            'articles': resp,
            })
