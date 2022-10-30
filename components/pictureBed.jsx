import React, { Component } from 'react';
import Card from './base_unit/card';
import styled from 'styled-components';
import PictureItem from './pictures/pictureItem';
import PicturePreview from './pictures/picturePreview';
import PicturebedMessage from './pictures/picturebedMessage';
import $ from 'jquery';
import { TOKEN, OnTokenLoad } from './token/identityToken';
import NoticeToast from './base_unit/noticeToast';
import { requestUrl } from '../API/requestUrl';

class PictureBed extends Component {
    state = {  
        previewShow: false,
        previewUrl: "",
        images: [],
        isUpdate: false, // 每当进行操作(添加或者删除)都会变成true，然后messagr组件都会重新获取用户图片信息
        currentCount: 0,
        notice: false,
        errorNotice: false,
        errorMessage: "",
    } 

    componentDidMount() {
        // 设置文章列表标题
        document.title="图床";

        $(window).on('scroll.image', this.handleScroll);
        $('.navbar-picturebed').addClass("active");

        OnTokenLoad(() => {
            $.ajax({
                url: `${requestUrl}/image/getImageList/`,
                type: "get",
                headers: {
                    'Authorization': "Bearer " + TOKEN.access_token,
                },

                data: {
                    currentCount: 0,
                },

                success: (resp) => {
                    if(resp.result === "success") {
                        this.setState({
                            images: resp.images,
                            isUpdate: true,
                            currentCount: 0 + parseInt(resp.responseCount),
                        });
                    }
                    else {
                        if(resp.result !== "已经到底了!") {
                            this.setState({errorNotice: true, errorMessage: resp.result}, () => {
                                setTimeout(() => {
                                    this.setState({errorNotice: false});
                                }, 3 * 1000);
                            });
                        }
                    }
                },
            });
        });
    }

    componentWillUnmount() {
        $('.navbar-picturebed').removeClass("active");
        $(window).off('scroll.image');
    }

    render() { 
        return (
            <React.Fragment>
                {this.state.previewShow ? 
                <PicturePreview
                    switchPreview={this.switchPreview}
                    imageUrl={this.state.previewUrl}
                /> : null}
                <Card style={this.getCardStyle()}>
                    <PictureBedStyle>
                        <div className="picturebed-head row align-items-center">
                            <div className="picturebed-upload col-md-8 col-sm-12 col-xs-12 px-4">
                                <div className="picturebed-upload-area row justify-content-start align-items-center">
                                    <div onClick={this.handleClickUpload} className="col-md-5 col-sm-12 col-xs-12 picturebed-upload-area-icon">
                                        <i className="bi bi-images"></i>
                                        <span>点此处选择图片</span>
                                        <input onChange={this.handleOnChangeUpload} type="file" className="image-upload" accept='image/*'/>
                                    </div>

                                    <div className="d-none d-lg-block col-md-7 col-sm-12 col-xs-12 picturebed-upload-area-declare">
                                        <span className='declare-title'>注意事项</span>
                                        <ul className='declare-list'>
                                            <li>图片大小应小于10MB</li>
                                            <li>上传图片不会增加水印</li>
                                            <li>图片列表只显示你在这里上传的图片</li>
                                            <li>上传图片后需要等待一段时间才会显示出来</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-12 col-md-4 col-sm-12 mt-4 mt-md-0">
                                {
                                    <PicturebedMessage
                                    isUpdate = {this.state.isUpdate}
                                    switchIsUpdate = {this.switchIsUpdate}
                                    />
                                }
                            </div>
                            
                        </div>

                        <div className="picturebed-body">
                            <div className="picturedbed-body-head">
                                <h5>图片列表</h5>
                                <i onClick={this.handleClickUpdate} title='刷新' className="picturedbed-body-refresh bi bi-funnel-fill"></i>
                            </div>

                            <div className="row">
                                {
                                    this.state.images.map(image => {
                                        return (
                                            <PictureItem
                                                key={image.imageId}
                                                switchPreview={this.switchPreview}
                                                imageUpdate={this.handleClickUpdate}
                                                imageId={image.imageId}
                                                imageUrl={`${requestUrl}` + image.imageUrl}
                                                imageSize={image.imageSize}
                                                imageCreateTime={image.imageCreateTime}
                                            />
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </PictureBedStyle>
                    {this.getNotice()}
                    {this.getErrorNotice()}
                </Card>
            </React.Fragment>
        );
    }

    getCardStyle = () => {
        const style = {
            margin: "0 auto",
            minHeight: "35rem",
            width: "85%",
            backgroundColor: "#EFEFEF",
            boxShadow: "2px 1px 12px #DDDDDD",
        };

        return style;
    }

    getNotice() {
        let message = "上传成功!";

        if(this.state.notice) {
            return (
                <NoticeToast 
                    message = {message}
                    handleClick = {this.handleClickNotice}
                />
            );
        }
    }

    getErrorNotice() {
        if(this.state.errorNotice)
        return (
            <NoticeToast 
                messageType="warning"
                message={this.state.errorMessage}
                handleClick = {this.handleClickErrorNotice}
            />
        );
    }

    handleClickNotice = () => {
        if(this.state.notice === true)
            this.setState({notice: false});
    }

    handleClickErrorNotice = () => {
        if(this.state.errorNotice === true)
            this.setState({errorNotice: false});
    }

    switchPreview = (newstat, imageUrl) => {
        if(!imageUrl) imageUrl = "";
        this.setState({previewShow: newstat, previewUrl: imageUrl});
    }

    switchIsUpdate = () => {
        this.setState({isUpdate: false});
    }

    handleClickUpload = (e) => {
        document.querySelector(".image-upload").click();
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
                        url: `${requestUrl}/image/upload/`,
                        type: "post",
                        headers: {
                            "Authorization": "Bearer " + TOKEN.access_token,
                        },
                        data: data,
                        processData: false,
                        contentType: false,

                        success: (resp) => {
                            if(resp.result === "success") {
                                this.handleClickUpdate();
                                this.setState({notice: true}, () => {
                                    setTimeout(() => {
                                        this.setState({notice: false});
                                    }, 3 * 1000);
                                });
                            }
                            else {
                                this.setState({errorNotice: true, errorMessage: resp.result}, () => {
                                    setTimeout(() => {
                                        this.setState({errorNotice: false});
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
    // 在更新数据后刷新数据
    handleClickUpdate = () => {
        $.ajax({
            url: `${requestUrl}/image/getImageList/`,
            type: "get",
            headers: {
                'Authorization': "Bearer " + TOKEN.access_token,
            },

            data: {
                currentCount: 0,
            },

            success: (resp) => {
                if(resp.result === "success") {
                    this.setState({
                        images: resp.images,
                        isUpdate: true,
                        currentCount: 0 + parseInt(resp.responseCount),
                    });
                }
                else {
                    this.setState({errorNotice: true, errorMessage: resp.result, images: [], isUpdate: true, currentCount: 0}, () => {
                        setTimeout(() => {
                            this.setState({errorNotice: false});
                        }, 3 * 1000);
                    });
                }
            },
        });
    }

    handleScroll = (e) => {
        if(this.state.images.length === 0) {
            return ;
        }
        // $(document).scrollTop()滚动距离, $(document).height()页面高度， $(window).height()视窗高度
        // 滚动距离 + 视窗高度 === 页面高度，说明到底了.
        if($(document).scrollTop() >= $(document).height() - $(window).height()) {
            $.ajax({
                url: `${requestUrl}/image/getImageList/`,
                type: "get",
                headers: {
                    'Authorization': "Bearer " + TOKEN.access_token,
                },
    
                data: {
                    currentCount: this.state.currentCount,
                },
    
                success: (resp) => {
                    if(resp.result === "success") {
                        this.setState({
                            images: [
                                ...this.state.images,
                                ...resp.images,
                            ],
                            currentCount: this.state.currentCount + parseInt(resp.responseCount),
                        });
                    }
                    else {
                        this.setState({errorNotice: true, errorMessage: resp.result}, () => {
                            setTimeout(() => {
                                this.setState({errorNotice: false});
                            }, 3 * 1000);
                        });
                    }
                },
            });
        }
    }
}
 
const PictureBedStyle = styled.div`

    & .picturebed-head {
        
    }

    & .picturebed-upload-area {
        background-color: white;
        border-radius: 5px;
        border: 1px solid #95A5A6;
    }

    & .picturebed-upload-area-icon {
        width: 144px;
        height: 140px;
        margin: 0 auto;
        background-color: #FAFAFA;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid #E8E8E8;
        cursor: pointer;
        border-radius: 5px;
    }

    & .picturebed-upload-area-icon:hover {
        border: 1px solid #89D1F5;
    }

    & .picturebed-upload-area-icon i {
        font-size: 60px;
        color: #3498DB;
    }

    & .picturebed-upload-area-icon i::before {
        display: block;
    }

    & .picturebed-upload-area-icon span {
        font-size: 14px;
        color: #3F3F3F;
        margin-top: 8px;
    }

    & .picturebed-upload-area input {
        display: none;
    }

    & .picturebed-upload-area-declare {
        margin: 0 20px;
    }

    & .declare-title {
        font-size: 18px;
        font-weight: bold;
    }

    & .declare-list li {
        font-size: 16px;
        color: #95A5A6;
    }

    & .picturebed-body {
        min-height: 20rem;
        margin-top: 25px;
        padding: 20px;
        border: 1px solid #95A5A6;
        background-color: white;
        border-radius: 5px;
        box-shadow: 1px 4px 4px #CAD3C8;
    }

    & .picturedbed-body-head {
        display: flex;
        justify-content: space-between; 
    }

    & .picturedbed-body-refresh {
        color: #3498DB;
        font-size: 22px;
    }

    & .picturedbed-body-refresh:hover {
        color: #0056B3;
    }

    & .picturedbed-body-head h5 {
        font-weight: bold;
    }
`

export default PictureBed;
