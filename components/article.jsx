import React, { Component } from 'react';
import Card from './base_unit/card';
import ArticlePreview from './articles/articlepreviews';
import SearchBar from './base_unit/searchBar';
import $ from 'jquery';
import { TOKEN, OnTokenLoad, OnTourist } from './token/identityToken';
import BackTop from './base_unit/BackTop';
import NoticeToast from './base_unit/noticeToast';

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
        $(window).on('scroll.article', this.handleScroll);
        $('.navbar-article').addClass("active");

        OnTokenLoad(() => {
            $.ajax({
                url: "http://150.158.182.65/article/getlist/",
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
                                    ...resp.articles,
                                ],
                                current_count: this.state.current_count + parseInt(resp.article_size),
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
                <Card style={this.getCardStyle()}>
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
                    {this.getErrorNotice()}
                </Card>
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
                    url: "http://150.158.182.65/article/getlist/",
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
                    url: "http://150.158.182.65/article/search/",
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
                url: "http://150.158.182.65/article/search/",
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

    getCardStyle = () => {
        const style = {
            margin: "0 auto",
            minHeight: "35rem",
            width: "75%",
            backgroundColor: "rgba(255, 255, 255, 100%)",
            marginBottom: "2rem",
            boxShadow: "2px 1px 12px #DDDDDD",
        };

        return style;
    }
}
 
export default Article;