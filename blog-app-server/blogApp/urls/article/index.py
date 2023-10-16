from django.urls import path
from blogApp.views.article.createArticle import CreateArticleView
from blogApp.views.article.getArticle import GetArticleView
from blogApp.views.article.getArticleList import GetArticleListView
from blogApp.views.article.modifyArticle import ModifyArticleView
from blogApp.views.article.searchArticle import SearchArticleView
from blogApp.views.article.deleteArticle import DeleteArticleView
from blogApp.views.article.batchOperate import BatchOperateView
from blogApp.views.article.getHomeArticleList import GetHomeArticleListView

urlpatterns = [
    path('create/', CreateArticleView.as_view(), name = 'article_create'),
    path('get/', GetArticleView.as_view(), name = 'article_get'),
    path('getlist/', GetArticleListView.as_view(), name = 'article_getlist'),
    path('modify/', ModifyArticleView.as_view(), name = 'article_modify'),
    path('search/', SearchArticleView.as_view(), name = 'article_search'),
    path('delete/', DeleteArticleView.as_view(), name = 'article_delete'),
    path('batchOperate/', BatchOperateView.as_view(), name = 'article_batchOperate'),
    path('getHomeArticleList/', GetHomeArticleListView.as_view(), name = 'article_getHomeArticleList'),
]
