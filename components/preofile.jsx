import React, { Component } from 'react';
import Card from './base_unit/card';
import styled from 'styled-components';
import $ from 'jquery';
import { User, OnUserInfoLoad } from './base_unit/User/userInfo';
import {TOKEN} from './token/identityToken';
import NoticeToast from './base_unit/noticeToast';

class Profile extends Component {
    state = {  
        username: "",
        backgroundUrl: "",
        avatar: "",
        notice: false,
        noticeMessage: "",
        messageType: "",
    } 

    componentDidMount() {
        OnUserInfoLoad(() => {
            this.setState({username: User.getUserName(), avatar: User.getUserAvatar(), backgroundUrl: User.getBackgroundUrl()});
        })
    }

    render() { 
        return (
            <React.Fragment>
                <Card style={this.getCardStyle()}>
                    <ProfileStyle>

                        <div className="profile-avatar">
                            <div className="profile-avatar-modify">
                                <img src={this.state.avatar} alt="头像" />
                                <div className="profile-avatar-modify-button">
                                    <button onClick={this.handleClickUploadImage}>修改头像</button>
                                    <input onChange={this.handleOnChangeUpload} type="file" className="image-upload" accept='image/*'/>
                                </div>
                            </div>
                        </div>

                        <div className="profile-modify-message">
                            <div className='profile-modify-message-title'>修改信息</div>
                            <hr />
                            <div className="profile-modify-message-list">
                                <div className="mb-3">
                                    <label htmlFor="modify-username" className="form-label">昵称: </label>
                                    <input defaultValue={this.state.username} type="text" className="form-control setinfo-username" id="modify-username"  />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="modify-background" className="form-label">背景图片地址: </label>
                                    <input defaultValue={this.state.backgroundUrl} type="text" className="form-control setinfo-background" id="modify-background"  />
                                </div>

                                <div className="profile-modify-message-button">
                                    <button onClick={this.handleClickSetInfo}>修改</button>
                                </div>
                            </div>
                        </div>
                    </ProfileStyle>

                    {this.getNotice()}
                </Card>
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

    getCardStyle = () => {
        const style = {
            margin: "0 auto",
            minHeight: "35rem",
            width: "75%",
            backgroundColor: "rgba(255, 255, 255)",
            boxShadow: "2px 1px 12px #DDDDDD",
        };

        return style;
    }

    handleClickUploadImage = (e) => {
        document.querySelector(".image-upload").click(); // 手动触发input上传
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
                        url: "http://150.158.182.65/image/setAvatar/",
                        type: "post",
                        headers: {
                            "Authorization": "Bearer " + TOKEN.access_token,
                        },
                        data: data,
                        processData: false,
                        contentType: false,

                        success: (resp) => {
                            if(resp.result === "success") {
                                window.location.href = "/";
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

    handleClickSetInfo = (e) => {
        let username = $('.setinfo-username').val();
        let backgroundUrl = $('.setinfo-background').val();

        $.ajax({
            url: "http://150.158.182.65/user/setinfo/",
            type: "post",
            headers: {
                'Authorization': "Bearer " + TOKEN.access_token,
            },

            data: {
                username: username,
                backgroundUrl: backgroundUrl,
            },

            success: (resp) => {
                if(resp.result === "success") {
                    window.location.href = "/";
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
 
const ProfileStyle = styled.div`
    
    & .profile-title {
        font-size: 20px;
        font-weight: bold;
    }

    & .profile-avatar {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    & .profile-avatar-modify {

    }

    & .profile-avatar-modify img {
        max-width: 20rem;
        max-height: 20rem;
        display: block;
        border: 1px solid #E8E8E8;
        border-radius: 5px;
    }

    & .profile-avatar-modify-button {
        margin-top: 5px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    & .profile-avatar-modify-button button {
        width: 6rem;
        height: 2.5rem;
        background-color: white;
        border-radius: 5px;
        border: 1px solid #CCCCCC;
    }

    & .profile-avatar-modify-button input {
        display: none;
    }

    & .profile-avatar-modify-button button:hover {
        background-color: #E6E6E6;
    }

    & .profile-modify-message-title {
        font-size: 18px;
        font-weight: bold;
    }

    & .profile-modify-message-list {
        display: flex;
        flex-direction: column;
        padding: 0px 10rem;
    }

    & .profile-modify-message-list label {
        font-size: 16px;
        font-weight: bold;
    }

    & .profile-modify-message-button {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    & .profile-modify-message-button button {
        width: 6rem;
        height: 3rem;
        color: white;
        background-color: #5CB85C;
        border-radius: 5px;
        border: 1px solid #CCCCCC;
    }

    & .profile-modify-message-button button:hover {
        background-color: #449D44;
    }
`

export default Profile;