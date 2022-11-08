import React, { Component } from 'react';
import styled from 'styled-components';
import $ from "jquery";
import { connect } from 'react-redux';
import HomeItem from './base_unit/homeItem';
import HomeHead from './base_unit/homehead';
import { requestUrl } from '../API/requestUrl';
import ICPInformation from './ICPInformation';

class Home extends Component {
    state = {  
        articles: [],
    } 

    componentDidMount() {
        // 设置首页标题
        document.title="首页";
        // 先从本地获取文章，再从服务器获取文章
        let storage_articles = localStorage.getItem("home_articles");
        if(storage_articles && typeof(storage_articles) !== 'undefined') {
            storage_articles = JSON.parse(storage_articles);

            this.setState({
                articles: [
                    ...storage_articles
                ],
            });
        }

        $.ajax({
            url: `${requestUrl}/article/getHomeArticleList/`,
            type: "get",
            
            success: (resp) => {
                if(resp.result === "success") {
                    // 将获取到的文章缓存在本地一份
                    if(resp.articles) {
                        localStorage.setItem("home_articles", JSON.stringify(resp.articles));
                    }

                    this.setState({
                        articles: [
                            ...resp.articles
                        ],
                    });
                }
                else {
                    window.location.href = '/404'; //跳转到404
                }
            }
        });
    }

    render() { 
        return (
            <React.Fragment>
                <HomeStyle>
                    {this.getHomeHead()}

                    <div className="home-body-items">
                        {
                            this.state.articles.map((article) => {
                                return (
                                    <HomeItem 
                                        key={article.aid}
                                        fileClass={article.type}
                                        fileTitle={article.title}
                                        userAvatar={`${requestUrl}${article.avatarUrl}`}
                                        username={article.username}
                                        time={article.time}
                                        content={article.content}
                                        articleId={article.aid}
                                    />
                                );
                            })
                        }
                    </div>

                    <ICPInformation />
                </HomeStyle>
            </React.Fragment>
        );
    }

    getHomeHead() {
        if(this.props.userStat === 1) {
            return (
                <HomeHead 
                    updateImages = {this.updateImages}
                />
            );
        }
    }

    // 更新图片
    updateImages = () => {
        $.ajax({
            url: `${requestUrl}/article/getHomeArticleList/`,
            type: "get",

            success: (resp) => {
                if(resp.result === "success") {
                    // 将获取到的文章缓存在本地一份
                    if(resp.articles) {
                        localStorage.setItem("home_articles", JSON.stringify(resp.articles));
                    }

                    this.setState({
                        articles: [
                            ...resp.articles
                        ],
                    });
                }
                else {
                    window.location.href = '/404'; //跳转到404
                }
            }
        });
    }
}

const mapStateToProps = (state) => {
    return {
        userStat: state.userStat,
    }
}

export default connect(mapStateToProps)(Home);

const HomeStyle = styled.div.attrs(props => {
    return {
        className: "card col-md-7",
    }
})`
    & {
        margin: 0 auto;
        min-height: 35rem;
        /* width: 75%; */
        background-color: rgba(255, 255, 255, 0%);
        border: none;
    }

    & .home-body-items {
        width: 100%;
        min-height: 80vh;
    }
`