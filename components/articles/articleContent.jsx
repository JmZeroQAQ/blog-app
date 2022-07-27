import React, { Component } from 'react';
import Card from '../base_unit/card';
import DisplayMarkDown from './displayMarkdown';
import $ from 'jquery';

const markdown = `## Here is some JavaScript code:
~~~c++
console.log('It works!')
console.log('It works!')
console.log('It works!')

#include <iostream>

int main() {

    return 0;
}
~~~

**hello world**

`

class ArticleContent extends Component {
    state = {  
        article_content: markdown,
    } 
    
    componentDidMount() {
        //ajax
    }

    render() { 
        return (
            <React.Fragment>
                <Card style={this.getCardStyle()}>
                    <div className="article-content">
                        <div className="article-head">
                            <h4>CSS</h4>
                            <div className="article-head-message">
                                <span>作者：</span>
                                <span className='article-head-message-author'>JmzeroQAQ</span>
                                <span> , </span>
                                <span>2022-7-27 15:44</span>
                            </div>
                            <div className='article-change-icon'>
                                <span className="bi bi-pencil-fill"></span>
                            </div>
                            <hr style={{marginTop: "6px", color: "#999999"}} />
                        </div>
                        <div className="article-body">
                            <div className="article-body-content">
                                <DisplayMarkDown 
                                    article={this.state.article_content}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </React.Fragment>
        );
    }

    getCardStyle = () => {
        const style = {
            width: "70%",
            margin: "0 auto",
            minHeight: "35rem",
            backgroundColor: "rgba(255, 255, 255, 75%)",
        };
    
        return style;
    }
}
 
export default ArticleContent;