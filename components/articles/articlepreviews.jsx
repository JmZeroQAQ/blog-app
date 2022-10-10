import React, { Component } from 'react';
import ModifyIcon from '../base_unit/modifyIcon';
import styled from 'styled-components';
import { User, OnUserInfoLoad } from '../base_unit/User/userInfo';

class ArticlePreview extends Component {
    state = {  
        avatarUrl: "",
    } 

    componentDidMount() {
        OnUserInfoLoad(() => {
            this.setState({avatarUrl: User.getUserAvatar()});
        });
    }

    render() { 
        return (
            <React.Fragment>
                <PreviewStyle>
                    <div onClick={this.handleClickNewBlank} className="shadow rounded preview">
                        <div className="article-preview-head">
                            <ModifyIcon style={{float: "right"}} handleClickModify={this.handleClickModify} />

                            <div className='preview-title'>
                                {this.props.title}
                            </div>

                            <div className="article-brief">
                                <span className='article-brief-content'> {this.props.brief} </span>
                            </div>
                        </div>

                        <hr style={{margin: '2px'}} />

                        <div className="article-preview-body">
                            <div className="article-message row align-items-center">
                                <div className="col-lg-3 col-sm-12">
                                    <span className='title-item'>关键字 : </span>
                                    <span className='title-content-item'>{this.props.keywords}</span>
                                </div>
                                
                                <div className='col-lg-4 col-sm-12'>
                                    <span className='title-item'>Author : </span>
                                    <div className='author-message'>
                                        <img className='avatar-item' src={this.state.avatarUrl} alt="头像" />
                                        <span className='title-content-item'>{this.props.author} </span>
                                    </div>
                                    
                                </div>
                                
                                <div className='col-lg-3 col-sm-12'>
                                    <span className='title-item'>Time : </span>
                                    <span className='title-content-item'>{this.props.time}</span>
                                </div>
                                
                                <div className='col-lg-2 col-sm-12'>
                                    <span className='title-item'>范围 : </span>
                                    <span className='title-content-item'>{this.props.visible === "all" ? "公开" : "未公开"}</span>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </PreviewStyle>
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
}
 
const PreviewStyle = styled.div`

    & .preview {
        background-color: rgba(251, 241, 211, 70%);
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 1rem;
        padding: 10px;
        box-sizing: border-box;
    }
    
    & .preview-title {
        color: #212121;
        margin-bottom: 0px;
        margin-top: 3px;
        font-size: 20px;
    }

    & .article-brief {
        font-size: 14px;
    }

    & .article-brief-content {
        color: #99A2AA;
        display: block;
        font-weight: lighter; 
        white-space: nowrap; 
        text-overflow: ellipsis; 
        overflow: hidden;
    }

    & .author-message {
        display: inline-block;
    }

    & .article-message {
        font-size: 14px;
        margin-top: 8px;
    }

    & .avatar-item {
        border: 1px solid #EFEFEF;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 4px;
    }

    & .title-item {
        color: #6a737d;
        font-weight: bold;
        margin-right: 4px;
    }

    & .title-content-item {
        font-weight: lighter;
        white-space: nowrap;
    }
`

export default ArticlePreview;