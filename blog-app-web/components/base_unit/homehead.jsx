import React, { Component } from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import { User, OnUserInfoLoad } from './User/userInfo';
import NoticeToast from './noticeToast';
import { TOKEN } from '../token/identityToken';
import { requestUrl } from '../../API/requestUrl';

class HomeHead extends Component {
    state = {  
        avatarUrl: `${requestUrl}/media/images/2022100416550886.png`, // 未登录时显示
        notice: false,
        noticeMessage: "",
        messageType: "",
    } 

    componentDidMount() {
        OnUserInfoLoad(() => {
            this.setState({
                avatarUrl: User.getUserThumbnail(),
            });
        });
    }

    render() { 
        return (
            <React.Fragment>
                <HomeHeadStyle>
                    <div className="head card">
                        <div className="row align-items-center p-2">
                            <div className="d-none d-md-block col-md-1 head-content-image">
                                <img src={this.state.avatarUrl} alt="" />
                            </div>

                            <div className="col-md-11 col-xs-12 head-content-button">
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
                        url: `${requestUrl}/image/homeImageUpload/`,
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

    & .head-content-image img {
        display: block;
        margin: 0 auto;

        width: 50px;
        height: 50px;
        border: 1px solid #EFEFEF;
        border-radius: 50%;
        object-fit: cover;
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