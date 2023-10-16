from django.core.cache import cache

# 查看这篇文章是否在redis缓存中，如果在，就把它给删除
def clearArticleCache(articleId):
    keys = cache.keys('*-%d' % articleId)
    if keys:
        key = keys[0]
        cache.delete(key)
        print('redis clear article %d' % articleId)
