import React, { Component } from 'react';
import Card from '../base_unit/card';
import DisplayMarkDown from './displayMarkdown';
import $ from 'jquery';
import { TOKEN, OnTokenLoad } from '../token/identityToken';
import { useParams } from 'react-router-dom';

class ArticleContent extends Component {
    state = {  
        content: "",
        title: "CSS",
        author: "JmZeroQAQ",
        brief: "hello world",
        time: "2020.4.12 14:00",
        keywords: "docker, python",
        visible: "all",
        load: false,
    } 
    
    componentDidMount() {

        OnTokenLoad(() => {
            console.log(this.props.params.article_id);
            $.ajax({
                url: "http://192.168.43.142/article/get/",
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
                        console.log(resp.result);
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

    getCardStyle = () => {
        const style = {
            width: "70%",
            margin: "0 auto",
            minHeight: "40rem",
            backgroundColor: "rgba(255, 255, 255, 100%)",
            marginBottom: "2rem",
            boxShadow: "2px 1px 12px #DDDDDD",
        };
    
        return style;
    }

    handleClickModify = () => {
        window.location.href = `/modify/${this.props.params.article_id}`;
    }

    getContent() {
        if(this.state.load) {
            return (
                <Card style={this.getCardStyle()}>
                    <div className="article-content">
                        <div className="article-head">
                            <h2 style={{color: "#24292F", fontSize: "30px", marginTop: "10px"}}>{this.state.title}</h2>
                            <div className="article-head-message">
                                <span>作者：</span>
                                <span className='article-head-message-author'>{this.state.author}</span>
                                <span> ,  </span>
                                <span>{this.state.time}</span>
                                <span> ,  </span>
                                <span>所有人可见</span>
                            </div>

                            <div onClick={this.handleClickModify} style={{cursor: "pointer"}} className='article-change-icon'>
                                <span className="bi bi-pencil-fill"></span>
                            </div>


                            <hr style={{marginTop: "6px", color: "#999999"}} />
                        </div>
                        <div className="article-body">
                            <div className="article-body-content markdown-body">
                                <DisplayMarkDown 
                                    article={this.state.content}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            );
        }
    }
}
 
//eslint-disable-next-line
export default (props) => (
    <ArticleContent
        {...props}
        params={useParams()}
    />
);