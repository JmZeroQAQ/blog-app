import React, { Component } from 'react';
import Card from './base_unit/card';
import ArticlePreview from './articles/articlepreviews';
import SearchBar from './base_unit/searchBar';
import $ from 'jquery';

class Article extends Component {
    state = {
        articles: [
            // {
            //     title: "CSS",
            //     author: "JmZeroQAQ",
            //     time: "2022.7.25 21:47",
            //     content: "hello world",
            //     aid: "14",
            // },
        ]  
    } 

    componentDidMount() {
        $.ajax({
            url: "http://192.168.43.142/article/getlist/",
            type: "get",

            success: (resp) => {
                console.log(resp);
                this.setState({articles: resp});
            }
        });
    }
    render() { 
        return (
            <React.Fragment>
                <Card style={this.getCardStyle()}>
                    <h3 style={{fontSize: "26px", fontWeight: "550", maginTop: "10px"}}>文章</h3>
                    <hr />
                    
                    <SearchBar />

                        {this.state.articles.map((e) => {
                            return (
                                <ArticlePreview 
                                    key={e.aid}
                                    title={e.title}
                                    author={e.author}
                                    time={e.time}
                                    content={e.brief}
                                    aid={e.aid}
                                    keywords={e.keywords}
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
            backgroundColor: "rgba(255, 255, 255, 100%)",
            marginBottom: "2rem",
            boxShadow: "2px 1px 12px #DDDDDD",
        };

        return style;
    }
}
 
export default Article;