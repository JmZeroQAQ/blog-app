import React, { Component } from 'react';
import Card from './base_unit/card';
import ArticlePreview from './articles/articlepreviews';

class Article extends Component {
    state = {
        articles: [
            {
                title: "CSS",
                author: "JmZeroQAQ",
                time: "2022.7.25 21:47",
                content: "hello world",
                aid: "1",
            },
            {
                title: "CSS",
                author: "JmZeroQAQ",
                time: "2022.7.25 21:47",
                content: "hello world",
                aid: "2",
            },
            {
                title: "CSS",
                author: "JmZeroQAQ",
                time: "2022.7.25 21:47",
                content: "hello world",
                aid: "3",
            },
            {
                title: "CSS",
                author: "JmZeroQAQ",
                time: "2022.7.25 21:47",
                content: "hello world",
                aid: "4",
            },
            {
                title: "CSS",
                author: "JmZeroQAQ",
                time: "2022.7.25 21:47",
                content: "hello world",
                aid: "5",
            },
        ]  
    } 
    render() { 
        return (
            <React.Fragment>
                <Card style={this.getCardStyle()}>
                    <h3>文章</h3>
                    <hr />
                        {this.state.articles.map((e) => {
                            return (
                                <ArticlePreview 
                                    key={e.aid}
                                    title={e.title}
                                    author={e.author}
                                    time={e.time}
                                    content={e.content}
                                />
                            );
                        })}
                </Card>
            </React.Fragment>
        );
    }

    getCardStyle = () => {
        const style = {
            margin: "0 auto",
            minHeight: "35rem",
            width: "75%",
            backgroundColor: "rgba(255, 255, 255, 0%)",
            marginBottom: "2rem",
        };

        return style;
    }
}
 
export default Article;