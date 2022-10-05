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
                <div onClick={this.handleClickNewBlank} className="shadow rounded" style={this.get_style()}>
                    <PreviewStyle>
                        <div className="article-preview-head">

                            <ModifyIcon style={{float: "right"}} handleClickModify={this.handleClickModify} />

                            <div className='preview-title'>
                                {this.props.title}
                            </div>

                            <div className="article-brief" style={{fontSize: "14px", marginBottom: "4px"}}>
                                    <span style={{display: "block", fontWeight: 'lighter', whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}> {this.props.brief} </span>
                            </div>
                        </div>

                        <hr style={{margin: '2px'}} />

                        <div className="article-preview-body">
                            <div className="article-message">
                                <span className='title-item'>关键字 : </span>
                                    <span className='title-content-item'>{this.props.keywords}</span>

                                    <span className='title-item'>Author : </span>
                                    <img className='avatar-item' src={this.state.avatarUrl} alt="头像" />
                                    <span className='title-content-item'>{this.props.author} </span>

                                    <span className='title-item'>Time : </span>
                                    <span className='title-content-item'>{this.props.time}</span>

                                    <span className='title-item'>范围 : </span>
                                    <span className='title-content-item'>{this.props.visible === "all" ? "公开" : "未公开"}</span>
                            </div>
                        </div>
                    </PreviewStyle>
                </div>
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
}
 
const PreviewStyle = styled.div`
    
    & .preview-title {
        margin-bottom: 0px;
        margin-top: 3px;
        font-size: 20px;
    }

    & .article-message {
        font-size: 14px;
        margin-top: 8px;
        margin-bottom: 2px;
    }

    & .avatar-item {
        width: 28px;
        height: 28px;
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
        margin-right: 2rem;
    }
`

export default ArticlePreview;