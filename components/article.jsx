import React, { Component } from 'react';
import styled from 'styled-components';
import ArticlePreview from './articles/articlepreviews';
import SearchBar from './base_unit/searchBar';
import $ from 'jquery';
import { TOKEN, OnTokenLoad, OnTourist } from './token/identityToken';
import BackTop from './base_unit/BackTop';
import NoticeToast from './base_unit/noticeToast';
import { requestUrl } from '../API/requestUrl';

class Article extends Component {
    state = {
        searchValue: "",
        articles: [],
        mode: "normal",
        current_count: 0,
        errorNotice: false,
        errorMessage: "",
    } 

    componentDidMount() {
        // 设置文章列表标题
        document.title="文章列表";

        $(window).on('scroll.article', this.handleScroll);
        $('.navbar-article').addClass("active");

        // 先使用本地的文章列表，然后再向服务器请求新的文章列表
        let article_list = localStorage.getItem("article_list");
        if(article_list && typeof(article_list) !== 'undefined') {
            article_list = JSON.parse(article_list);
            
            this.setState(
                {
                    articles: [
                        ...article_list,
                    ],
                    current_count: 0 + parseInt(article_list.length),
                }
            );
        }

        OnTokenLoad(() => {
            $.ajax({
                url: `${requestUrl}/article/getlist/`,
                type: "get",
                headers: {
                    'Authorization': "Bearer " + TOKEN.access_token,
                },
                data: {
                    current_count: this.state.current_count,
                },
    
                success: (resp) => {
                    // 将获取到的文章列表缓存在本地一份
                    if(resp.articles) {
                        localStorage.setItem("article_list", JSON.stringify(resp.articles));
                    }

                    if(resp.result === "success") {
                        this.setState(
                            {
                                articles: [
                                    ...resp.articles,
                                ],
                                current_count: 0 + parseInt(resp.article_size),
                            }
                        );
                    }
                }
            });
        });

        OnTourist(() => {
            this.setState({errorNotice: true, errorMessage: "请登录!"}, () => {
                setTimeout(() => {
                    this.setState({errorNotice: false});
                }, 3 * 1000);
            });
        });
    }

    componentWillUnmount() {
        // 取消对滚动条的监听
        $(window).off('scroll.article');
        $('.navbar-article').removeClass("active");
    }

    render() { 
        return (
            <React.Fragment>
                <ArticleStyle>
                    <div className="article col-12 col-md-9">
                        <h3 style={{fontSize: "26px", fontWeight: "550", maginTop: "10px"}}>文章</h3>
                        <hr />
                        
                        <SearchBar
                            searchValue={this.state.searchValue}
                            handleChange={this.handleInputChange}
                            onSearch={this.onSearch}
                        />

                            {this.state.articles.map((e) => {
                                return (
                                    <ArticlePreview 
                                        key={e.aid}
                                        title={e.title}
                                        author={e.author}
                                        time={e.time}
                                        brief={e.brief}
                                        aid={e.aid}
                                        keywords={e.keywords}
                                        visible={e.visible}
                                    />
                                );
                            })}
                        <BackTop />
                    </div>
                    {this.getErrorNotice()}
                </ArticleStyle>
            </React.Fragment>
        );
    }

    getErrorNotice() {
        if(this.state.errorNotice)
        return (
            <NoticeToast 
                messageType="warning"
                message={this.state.errorMessage}
                handleClick = {this.handleClickErrorNotice}
            />
        );
    }

    handleClickErrorNotice = () => {
        if(this.state.errorNotice === true)
            this.setState({errorNotice: false});
    }

    // 当滚动条到底后，继续向服务器请求新的数据
    handleScroll = (e) => {
        if(this.state.articles.length === 0) {
            return ;
        }

        if($(document).scrollTop() >= $(document).height() - $(window).height()) {
            if(this.state.mode === "normal") {
                $.ajax({
                    url: `${requestUrl}/article/getlist/`,
                    type: "get",
                    headers: {
                        'Authorization': "Bearer " + TOKEN.access_token,
                    },
                    data: {
                        current_count: this.state.current_count,
                    },
        
                    success: (resp) => {
                        if(resp.result === "success") {
                            this.setState(
                                {
                                    articles: [
                                        ...this.state.articles,
                                        ...resp.articles,
                                    ],
                                    current_count: this.state.current_count + parseInt(resp.article_size),
                                }
                            );
                        }
                        else {
                            this.setState({errorNotice: true, errorMessage: resp.result}, () => {
                                setTimeout(() => {
                                    this.setState({errorNotice: false});
                                }, 3 * 1000);
                            });
                        }
                    }
                });
            }
            
            else if(this.state.mode === "search") {
                $.ajax({
                    url: `${requestUrl}/article/search/`,
                    type: "get",
                    headers: {
                        'Authorization': "Bearer " + TOKEN.access_token,
                    },
        
                    data: {
                        searchValue: this.state.searchValue,
                        current_count: this.state.current_count,
                    },
        
                    success: (resp) => {
                        if(resp.result === 'success') {
                            this.setState({
                                articles: [
                                    ...this.state.articles,
                                    ...resp.articles,
                                ],
                                current_count: this.state.current_count + resp.article_size,
                            });
                        }
                        else {
                            this.setState({errorNotice: true, errorMessage: resp.result}, () => {
                                setTimeout(() => {
                                    this.setState({errorNotice: false});
                                }, 3 * 1000);
                            });
                        }
                    }
                });
            }
        }
    }

    handleInputChange = (e) => {
        this.setState({searchValue: e.target.value});
    }

    // 搜索触发后 执行的函数
    onSearch = () => {
        let mode = this.state.searchValue === "" ? "normal" : "search";

        this.setState({mode: mode, current_count: 0}, () => {
            $.ajax({
                url: `${requestUrl}/article/search/`,
                type: "get",
                headers: {
                    'Authorization': "Bearer " + TOKEN.access_token,
                },
    
                data: {
                    searchValue: this.state.searchValue,
                    current_count: this.state.current_count,
                },
    
                success: (resp) => {
                    if(resp.result === 'success') {
                        this.setState({
                            articles: [
                                ...resp.articles,
                            ],
                            current_count: this.state.current_count + resp.article_size,
                        });
                    }
                    else {
                        this.setState({errorNotice: true, errorMessage: resp.result}, () => {
                            setTimeout(() => {
                                this.setState({errorNotice: false});
                            }, 3 * 1000);
                        });
                    }
                }
            });
        });
    }
}
 
export default Article;

const ArticleStyle = styled.div.attrs(props => {
    return {
        className: "row",
    }
})`
    & .article {
        margin: 0 auto;
        min-height: 35rem;
        background-color: white;
        margin-bottom: 2rem;
        border: 1px solid #DDDDDD;
        border-radius: 10px;
        box-shadow: 2px 1px 12px #DDDDDD;
        padding: 30px;
    }
`