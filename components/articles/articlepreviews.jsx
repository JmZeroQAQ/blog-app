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

                            <ModifyIcon style={{float: "right"}} />

                            <div style={{marginBottom: "0px", marginTop: "3px", fontSize: "20px"}}>
                                {this.props.title}
                            </div>

                            <div className="article-simple-content" style={{fontSize: "14px", marginBottom: "4px"}}>
                                    <span style={{fontWeight: 'lighter'}}> {this.props.content} </span>
                            </div>
                        </div>

                        <hr style={{margin: '2px'}} />

                        <div className="article-preview-body">
                            <div className="article-message" style={this.get_article_message_style()}>
                                <span style={{fontWeight: 'bold', marginRight: "4px"}}>分类 : </span>
                                    <span style={{fontWeight: 'lighter', marginRight: "2rem"}}>docker </span>

                                    <span style={{fontWeight: 'bold', marginRight: "4px"}}>Author : </span>
                                    <img style={{width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover", marginRight: "4px"}} src='/images/avatar.jpg' alt="头像" />
                                    <span style={{fontWeight: 'lighter', marginRight: "2rem"}}>{this.props.author} </span>

                                    <span style={{fontWeight: 'bold', marginRight: "4px"}}>Time : </span>
                                    <span style={{fontWeight: 'lighter'}}>{this.props.time}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    handleClickNewBlank() {
        window.open("/article/jmzero/1");
    }

    handleClickModify(ev) {
        ev.preventDefault();
        ev.stopPropagation();

        console.log("123");
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