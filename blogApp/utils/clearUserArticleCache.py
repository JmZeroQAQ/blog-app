from django.core.cache import cache

# 在用户修改名字，修改头像的时候调用
# 传入一个旧的用户名，将这个用户名在redis里面缓存的文章全部删除
def clearUserArticleCache(username_old):
    for key in cache.keys('%s-*' % username_old):
        cache.delete(key)
