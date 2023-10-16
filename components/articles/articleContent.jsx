import React, { Component } from 'react';
import styled from 'styled-components';
import DisplayMarkDown from './displayMarkdown';
import $ from 'jquery';
import { TOKEN, OnTokenLoad, OnTourist } from '../token/identityToken';
import { useParams, useNavigate } from 'react-router-dom';
import { requestUrl } from '../../API/requestUrl';
import { User, OnUserInfoLoad } from '../base_unit/User/userInfo';

class ArticleContent extends Component {
    state = {  
        content: "",
        title: "",
        author: "",
        brief: "",
        time: "",
        keywords: "",
        visible: "",
        load: false,

        username: "", // 登录用户的昵称
    } 
    
    componentDidMount() {

        // 获取登录用户信息
        OnUserInfoLoad(() => {
            this.setState({username: User.getUserName()});
        });

        OnTokenLoad(() => {
            $.ajax({
                url: `${requestUrl}/article/get/`,
                type: "get",
                data: {
                    articleId: this.props.params.article_id,
                },
                headers: {
                    'Authorization': "Bearer " + TOKEN.access_token,
                },
    
                success: (resp) => {
                    if(resp.result === 'success') {
                        let title = resp.title;
                        let username = resp.username;
                        let keywords = resp.keywords;
                        let brief = resp.brief;
                        let content = resp.content;
                        let time = resp.time;
                        let visible = resp.visible;

                        this.setState({
                            title: title,
                            author: username,
                            keywords: keywords,
                            brief: brief,
                            time: time,
                            visible: visible,
                            content: content,
                            load: true,
                        });
                    }
                    else {
                        // 当文章未公开或者其它错误时
                        window.location.href = '/404';
                    }
                }
            });
        });

        // 游客访问接口
        OnTourist(() => {
            $.ajax({
                url: `${requestUrl}/article/get/`,
                type: "get",
                data: {
                    articleId: this.props.params.article_id,
                },
    
                success: (resp) => {
                    if(resp.result === 'success') {
                        let title = resp.title;
                        let username = resp.username;
                        let keywords = resp.keywords;
                        let brief = resp.brief;
                        let content = resp.content;
                        let time = resp.time;
                        let visible = resp.visible;

                        this.setState({
                            title: title,
                            author: username,
                            keywords: keywords,
                            brief: brief,
                            time: time,
                            visible: visible,
                            content: content,
                            load: true,
                        });
                    }
                    else {
                        // 当文章未公开或者其它错误时
                        window.location.href = '/404';
                    }
                }
            });
        });
    }

    render() { 
        return (
            <React.Fragment>
                {this.getContent()}
            </React.Fragment>
        );
    }

    handleClickModify = () => {
        this.props.navigate(`/modify/${this.props.params.article_id}`);
    }

    getContent() {
        if(this.state.load) {
            // 设置文章列表标题
            document.title = this.state.title;

            return (
                <ArticleContentStyle>
                    <div className="col-12 col-md-9 article-content">
                        <div className="article-head">
                            <h4 style={{color: "#24292F", fontWeight: "bold", marginTop: "10px"}}>{this.state.title}</h4>
                            <div className="article-head-message">
                                <span>作者：</span>
                                <span className='article-head-message-author'>{this.state.author}</span>
                                <span> ,  </span>
                                <span>{this.state.time}</span>
                                <span> ,  </span>
                                <span>{this.state.visible === "all" ? "所有人可见" : "仅自己可见"}</span>
                            </div>

                            {this.getModify()}


                            <hr style={{marginTop: "6px", color: "#999999"}} />
                        </div>
                        <div className="article-body">
                            {/* 这个markdown-body是导入markdown主题用的类 */}
                            <div className="markdown-body">
                                <DisplayMarkDown 
                                    article={this.state.content}
                                />
                            </div>
                        </div>
                    </div>
                </ArticleContentStyle>
            );
        }
    }

    getModify() {
        if(this.state.author === this.state.username) {
            return (
                <div className='article-change-icon'>
                    <span onClick={this.handleClickModify} style={{cursor: "pointer"}} className="bi bi-pencil-fill"></span>
                </div>
            );
        }
    }
}


const ArticleContentWrap = (props) => (
    <ArticleContent
        {...props}
        params={useParams()}
        navigate={useNavigate()}
    />
);

export default ArticleContentWrap;

const ArticleContentStyle = styled.div.attrs(props => {
    return {
        className: "row",
    }
})`

& .article-content {
        margin: 0 auto;
        min-height: 35rem;
        background-color: white;
        margin-bottom: 2rem;
        border: 1px solid #DDDDDD;
        border-radius: 10px;
        box-shadow: 2px 1px 12px #DDDDDD;
        padding: 10px 30px 30px 30px;
}
`