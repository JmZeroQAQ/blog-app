import React, { Component } from 'react';

class ArticlePreview extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <div className="col-md-3 col-sm-12 mx-md-4 mb-4" style={this.get_style()}>
                    <div className="articlePreview_content">
                        <div className="article-preview-head">
                            <div style={{marginBottom: "0px", marginTop: "3px"}}>
                                CSS
                            </div>
                            <div className="article-message" style={this.get_article_message_style()}>
                                <span style={{fontWeight: 'bold'}}>by : </span>
                                <span style={{fontWeight: 'lighter'}}>JmZeroQAQ </span>
                                <span style={{fontWeight: 'lighter'}}>2022.7.15 14:00</span>
                            </div>
                        </div>
                        <hr style={{margin: '2px'}} />
                        <div className="article-preview-body">
                            <div>
                                那年冬天，祖母死了，父亲的差使1也交卸了，正是祸不单行的日子。我从北京到徐州，打算跟着父亲奔丧2回家。到徐州见着父亲，看见满院狼藉3的东西，又想起祖母，不禁簌簌地流下眼泪。父亲说：“事已如此，不必难过，好在天无绝人之路！”
                                那年冬天，祖母死了，父亲的差使1也交卸了，正是祸不单行的日子。我从北京到徐州，打算跟着父亲奔丧2回家。到徐州见着父亲，看见满院狼藉3的东西，又想起祖母，不禁簌簌地流下眼泪。父亲说：“事已如此，不必难过，好在天无绝人之路！”
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
            height: "19rem",
            backgroundColor: "rgba(249, 197, 207, 50%)",
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