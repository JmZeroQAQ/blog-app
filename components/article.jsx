import React, { Component } from 'react';
import Card from './base_unit/card';
import ArticlePreview from './articles/articlepreviews';
import SearchBar from './base_unit/searchBar';
import $ from 'jquery';
import { TOKEN, OnTokenLoad } from './token/identityToken';
import BackTop from './base_unit/BackTop';

class Article extends Component {
    state = {
        searchValue: "",
        articles: [],
        mode: "normal",
        current_count: 0,
    } 

    componentDidMount() {
        $(window).on('scroll.article', this.handleScroll);

        OnTokenLoad(() => {
            $.ajax({
                url: "http://192.168.43.142/article/getlist/",
                type: "get",
                headers: {
                    'Authorization': "Bearer " + TOKEN.access_token,
                },
                data: {
                    current_count: this.state.current_count,
                },
    
                success: (resp) => {
                    console.log(resp);
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
    }

    componentWillUnmount() {
        // 取消对滚动条的监听
        $(window).off('scroll.article');
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
                                />
                            );
                        })}

                    <BackTop />
                </Card>
            </React.Fragment>
        );
    }

    // 当滚动条到底后，继续向服务器请求新的数据
    handleScroll = (e) => {
        if(this.state.articles.length === 0) {
            return ;
        }

        if($(document).scrollTop() >= $(document).height() - $(window).height()) {
            console.log("article 到底了");
            if(this.state.mode === "normal") {
                $.ajax({
                    url: "http://192.168.43.142/article/getlist/",
                    type: "get",
                    headers: {
                        'Authorization': "Bearer " + TOKEN.access_token,
                    },
                    data: {
                        current_count: this.state.current_count,
                    },
        
                    success: (resp) => {
                        console.log(resp);
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
                            console.log(resp);
                        }
                    }
                });
            }
            
            else if(this.state.mode === "search") {
                $.ajax({
                    url: "http://192.168.43.142/article/search/",
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
                            console.log(resp);
                            this.setState({
                                articles: [
                                    ...this.state.articles,
                                    ...resp.articles,
                                ],
                                current_count: this.state.current_count + resp.article_size,
                            });
                        }
                        else {
                            console.log(resp);
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
                url: "http://192.168.43.142/article/search/",
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
                        console.log(resp);
                        this.setState({
                            articles: [
                                ...resp.articles,
                            ],
                            current_count: this.state.current_count + resp.article_size,
                        });
                    }
                    else {
                        console.log(resp);
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