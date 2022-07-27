import React, { Component } from 'react';
import Card from './base_unit/card';
import ArticlePreview from './base_unit/articlepreviews';
import Row from './base_unit/article_row';
import Filter from './base_unit/article_filter';

class Article extends Component {
    state = {  
        title: "CSS",
        author: "JmZeroQAQ",
        time: "2022.7.25 21:47",
        content: "hello world",
    } 
    render() { 
        return (
            <React.Fragment>
                <Card style={this.getCardStyle()}>
                    <Filter />
                    <h3>文章</h3>
                    <hr />
                    <Row>
                        <ArticlePreview
                            title={this.state.title}
                            author={this.state.author}
                            time={this.state.time}
                            content={this.state.content}
                        />
                        <ArticlePreview
                            title={this.state.title}
                            author={this.state.author}
                            time={this.state.time}
                            content={this.state.content}
                        />
                        <ArticlePreview
                            title={this.state.title}
                            author={this.state.author}
                            time={this.state.time}
                            content={this.state.content}
                        />
                        <ArticlePreview
                            title={this.state.title}
                            author={this.state.author}
                            time={this.state.time}
                            content={this.state.content}
                        />
                        <ArticlePreview
                            title={this.state.title}
                            author={this.state.author}
                            time={this.state.time}
                            content={this.state.content}
                        />
                        <ArticlePreview
                            title={this.state.title}
                            author={this.state.author}
                            time={this.state.time}
                            content={this.state.content}
                        />
                    </Row>
                </Card>
            </React.Fragment>
        );
    }

    getCardStyle = () => {
        const style = {
            margin: "0 auto",
            minHeight: "35rem",
            backgroundColor: "rgba(255, 255, 255, 0%)",
        };

        return style;
    }
}
 
export default Article;