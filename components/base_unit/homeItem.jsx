import React, { Component } from 'react';
import styled from 'styled-components';
import DisplayMarkDown from '../articles/displayMarkdown';

class HomeItem extends Component {
    state = {  
        buttonStat: false, // false 表示现在是折叠状态, true表示是展开状态
        contentHeight: "500px",
    } 

    render() { 
        return (
            <React.Fragment>
                <HomeItemStyled contentHeight={this.state.contentHeight}>
                    <div className="d-flex p-2 justify-content-between head">
                        <span className='head-class'>{this.props.fileClass}</span>
                        <a href={`/article/${this.props.username}/${this.props.articleId}`} target="_blank" className='head-title' rel="noreferrer">{this.props.fileTitle}</a>
                    </div>
                    <hr className='mx-2 head-hr' />

                    <div className="content">
                        <div className="d-flex px-4 content-message">
                            <div className="user-image">
                                <img src={this.props.userAvatar} alt="" />
                            </div>

                            <div className="d-flex mx-2 flex-column user-message">
                                <span className="user-name">{this.props.username}</span>
                                <span className="file-time">{this.props.time}</span>
                            </div>
                        </div>

                        <div className={`px-4 pt-2 content-body`}>
                            <div className="markdown-body">
                                <DisplayMarkDown 
                                    article={this.props.content}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="px-2 tail mt-2 pb-1">
                        <span onClick={this.handleClickUnfold} className='tail-button'>{this.state.buttonStat ? "收起" : "展开"}</span>
                    </div>
                </HomeItemStyled>
            </React.Fragment>
        );
    }

    handleClickUnfold = (e) => {
        let newStat = true; // 变成展开状态
        let newHeight = "auto";
        if(this.state.buttonStat) {
            newStat = false; // 变成折叠状态
            newHeight = "500px";
        }

        this.setState({contentHeight: newHeight, buttonStat: newStat});
    }
}

const HomeItemStyled = styled.div`
    & {
        background-color: white;
        width: 100%;
        max-height: auto;
        margin-top: 10px;
        border: 1px solid #EFEFEF;
        box-shadow: 1px 3px 6px #EFEFEF;
        border-radius: 5px;
        margin-bottom: 20px;
    }

    & .head {
        background-color: #358CCB;
        border-radius: 5px 5px 0px 0px;
    }

    & .head-class {
        font-size: 16px;
        /* color: #333333; */
        color: white;
        font-weight: bold;
    }

    & .head-title {
        font-size: 16px;
        /* color: #333333; */
        color: white;
        font-weight: bold;
        text-decoration: none;
        cursor: pointer;
    }

    & .head-title:hover {
        color: #EFEFEF;
    }

    & .head-hr {
        margin-top: 0px;
    }

    & .user-image img {
        width: 48px;
        height: 48px;
        border: 1px solid rgb(239, 239, 239);
        object-fit: cover;
        border-radius: 50%;
    }

    & .user-name {
        font-size: 16px;
        /* color: #333333; */
        color: #FB7299;
        font-weight: bold;
    }

    & .file-time {
        font-size: 14px;
        color: #808080;
    }

    & .content-body {
        max-height: ${props => props.contentHeight};
        text-overflow: hidden;
        overflow: hidden;
    }

    & .tail-button {
        color: #337AB7;
        cursor: pointer;
    }

    & .tail-button:hover {
        color: #235A7C;
        text-decoration: underline;
    }

    & img {
        display: block;
        margin: 0 auto;
        max-width: 100%;
        border: 1px solid #E8E8E8;
    }
`

export default HomeItem;