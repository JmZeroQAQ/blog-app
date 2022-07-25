import React, { Component } from 'react';
import Card from './base_unit/card';
import ArticlePreview from './base_unit/articlepreviews';
import Row from './base_unit/article_row';

class Article extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <Card style={this.getCardStyle()}>
                    <h3>文章</h3>
                    <hr />
                    <Row>
                        <ArticlePreview></ArticlePreview>
                        <ArticlePreview></ArticlePreview>
                        <ArticlePreview></ArticlePreview>
                        <ArticlePreview></ArticlePreview>
                        <ArticlePreview></ArticlePreview>
                        <ArticlePreview></ArticlePreview>
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