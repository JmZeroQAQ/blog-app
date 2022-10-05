import React, { Component } from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import { User, OnUserInfoLoad } from './User/userInfo';
import NoticeToast from './noticeToast';
import { TOKEN } from '../token/identityToken';

class HomeHead extends Component {
    state = {  
        avatarUrl: "http://150.158.182.65/static/images/avatar.jpg",
        notice: false,
        noticeMessage: "",
        messageType: "",
    } 

    componentDidMount() {
        OnUserInfoLoad(() => {
            this.setState({
                avatarUrl: User.getUserAvatar(),
            });
        });
    }

    render() { 
        return (
            <React.Fragment>
                <HomeHeadStyle>
                    <div className="head card">
                        <div className="head-content row">
                            <div className="head-content-image col-md-1 col-xs-1">
                                <img src={this.state.avatarUrl} alt="" />
                            </div>

                            <div className="head-content-button col-md-11 col-xs-11">
                                <button onClick={this.handleClickUploadImage}>分享一张图片吧！</button>
                                <input onChange={this.handleOnChangeUpload} type="file" className="image-upload" accept='image/*'/>
                            </div>
                        </div>
                    </div>
                </HomeHeadStyle>

                {this.getNotice()}
            </React.Fragment>
        );
    }

    getNotice() {
        if(this.state.notice) {
            return (
                <NoticeToast 
                    messageType = {this.state.messageType}
                    message = {this.state.noticeMessage}
                    handleClick = {this.handleClickNotice}
                />
            );
        }
    }

    handleClickNotice = () => {
        if(this.state.notice === true)
            this.setState({notice: false});
    }

    handleClickUploadImage = (e) => {
        // refresh_token为空说明未登录
        if(TOKEN.refresh_token !== "") {
            document.querySelector(".image-upload").click(); // 手动触发input上传
        }
        else {
            this.setState({notice: true, noticeMessage: "请登录", messageType: "warning"}, () => {
                setTimeout(() => {
                    this.setState({notice: false});
                }, 3 * 1000);
            });
        }
    }

    handleOnChangeUpload = (e) => {
        if(e.target.files.length === 1) { // 上传单个文件
            let image = e.target.files[0];
            let image_name = image.name; // 图片名字
            let type = image_name.split('.');
            type = type[1];
            if(type === "png" || type === "gif" || type === "jpeg" || type === "jpg") {
                let image_size = parseInt(image.size) / 1024 / 1024; // 单位：MB
                if(image_size <= 10) {
                    let data = new FormData();
                    data.append("file", image);
                    
                    $.ajax({
                        url: "http://150.158.182.65/image/homeImageUpload/",
                        type: "post",
                        headers: {
                            "Authorization": "Bearer " + TOKEN.access_token,
                        },
                        data: data,
                        processData: false,
                        contentType: false,

                        success: (resp) => {
                            if(resp.result === "success") {
                                this.props.updateImages();
                            }
                            else {
                                this.setState({notice: true, noticeMessage: resp.result, messageType: "warning"}, () => {
                                    setTimeout(() => {
                                        this.setState({notice: false});
                                    }, 3 * 1000);
                                });
                            }
                        }
                    })
                }
            }
            else {
                alert("上传的文件必须是图片格式");
                return ;
            }
        }
    }
}
 

const HomeHeadStyle = styled.div`
    & .head {
        height: auto;
        padding: 0 20px;
    }

    & .head-content-image {
        height: 4rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    & .head-content-image img {
        width: 50px;
        height: 50px;
        border: 1px solid #EFEFEF;
        border-radius: 50%;
        object-fit: cover;
    }

    & .head-content-button {
        height: 4rem;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    & .head-content-button button {
        width: 100%;
        height: 50px;
        border-radius: 20px;
        border: 1px solid #EFEFEF;
        background-color: #F0F2F5;
        color: #656768;
        font-size: 22px;
    }

    & .head-content-button button:hover {
        background-color: #E4E6E9;
    }

    & .head-content-button input {
        display: none;
    }
`

export default HomeHead;