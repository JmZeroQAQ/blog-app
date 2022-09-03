import React, { Component } from 'react';
import ModifyIcon from '../base_unit/modifyIcon';

class ArticlePreview extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <div onClick={this.handleClickNewBlank} className="shadow rounded" style={this.get_style()}>
                    <div className="articlePreview_content">
                        <div className="article-preview-head">

                            <ModifyIcon style={{float: "right"}} handleClickModify={this.handleClickModify} />

                            <div style={{marginBottom: "0px", marginTop: "3px", fontSize: "20px"}}>
                                {this.props.title}
                            </div>

                            <div className="article-brief" style={{fontSize: "14px", marginBottom: "4px"}}>
                                    <span style={{fontWeight: 'lighter'}}> {this.props.brief} </span>
                            </div>
                        </div>

                        <hr style={{margin: '2px'}} />

                        <div className="article-preview-body">
                            <div className="article-message" style={this.get_article_message_style()}>
                                <span style={{color: "#6a737d", fontWeight: 'bold', marginRight: "4px"}}>关键字 : </span>
                                    <span style={{fontWeight: 'lighter', marginRight: "2rem"}}>{this.props.keywords}</span>

                                    <span style={{color: "#6a737d", fontWeight: 'bold', marginRight: "4px"}}>Author : </span>
                                    <img style={{width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover", marginRight: "4px"}} src='/images/avatar.jpg' alt="头像" />
                                    <span style={{fontWeight: 'lighter', marginRight: "2rem"}}>{this.props.author} </span>

                                    <span style={{color: "#6a737d", fontWeight: 'bold', marginRight: "4px"}}>Time : </span>
                                    <span style={{fontWeight: 'lighter'}}>{this.props.time}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    handleClickNewBlank = () => {
        window.open(`/article/${this.props.author}/${this.props.aid}/`);
    }
    
    handleClickModify = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        window.location.href = `/modify/${this.props.aid}`;
    }


    get_style = () => {
        const style = {
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
            height: "7rem",
            backgroundColor: "rgba(251, 241, 211, 70%)",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "1rem",
            padding: "15px",
        };

        return style;
    }

    get_article_message_style = () => {
        const style = {
            fontSize: "14px",
            marginTop: "8px",
            marginBottom: "2px",
        };

        return style;
    }
}
 
export default ArticlePreview;