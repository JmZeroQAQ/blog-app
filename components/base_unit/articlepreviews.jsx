import React, { Component } from 'react';

class ArticlePreview extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <div className="col-md-3 col-sm-12 mx-md-4 mb-4 shadow rounded" style={this.get_style()}>
                    <div className="articlePreview_content">
                        <div className="article-preview-head">
                            <div style={{marginBottom: "0px", marginTop: "3px"}}>
                                {this.props.title}
                            </div>
                            <div className="article-message" style={this.get_article_message_style()}>
                                <span style={{fontWeight: 'bold'}}>by : </span>
                                <span style={{fontWeight: 'lighter'}}>{this.props.author} </span>
                                <span style={{fontWeight: 'lighter'}}>{this.props.time}</span>
                            </div>
                        </div>
                        <hr style={{margin: '2px'}} />
                        <div className="article-preview-body">
                            <div>
                                {this.props.content}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    get_style = () => {
        const style = {
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
            height: "304px",
            backgroundColor: "rgba(251,241,211, 100%)",
            borderRadius: "5px",
            cursor: "pointer",
        };

        return style;
    }

    get_article_message_style = () => {
        const style = {
            fontSize: "8px",
            marginTop: "2px",
            marginBottom: "2px",
        };

        return style;
    }
}
 
export default ArticlePreview;