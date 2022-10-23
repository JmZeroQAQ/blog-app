import React, { Component } from 'react';
import styled from 'styled-components';
import $ from "jquery";
import HomeItem from './base_unit/homeItem';
import HomeHead from './base_unit/homehead';
import { requestUrl } from '../API/requestUrl';
import ICPInformation from './ICPInformation';

class Home extends Component {
    state = {  
        articles: [],
    } 

    componentDidMount() {
        // 先从本地获取文章，再从服务器获取文章
        let storage_articles = localStorage.getItem("home_articles");
        storage_articles = JSON.parse(storage_articles);

        this.setState({
            articles: [
                ...storage_articles
            ],
        });

        $.ajax({
            url: `${requestUrl}/article/getHomeArticleList/`,
            type: "get",
            
            success: (resp) => {
                if(resp.result === "success") {
                    // 将获取到的文章缓存在本地一份
                    localStorage.setItem("home_articles", JSON.stringify(resp.articles));

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
                    <HomeHead 
                        updateImages = {this.updateImages}
                    />

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

    // 更新图片
    updateImages = () => {
        $.ajax({
            url: `${requestUrl}/article/getHomeArticleList/`,
            type: "get",

            success: (resp) => {
                if(resp.result === "success") {
                    // 将获取到的文章缓存在本地一份
                    localStorage.setItem("home_articles", JSON.stringify(resp.articles));

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

export default Home;

const HomeStyle = styled.div.attrs(props => {
    return {
        className: "card",
    }
})`
    & {
        margin: 0 auto;
        min-height: 35rem;
        width: 75%;
        background-color: rgba(255, 255, 255, 10%);
        border: none;
    }

    & .home-body-items {
        width: 100%;
        min-height: 80vh;
    }
`