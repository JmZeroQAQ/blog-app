import React, { Component } from 'react';
import Card from './base_unit/card';
import styled from 'styled-components';
import PictureItem from './pictures/pictureItem';
import PicturePreview from './pictures/picturePreview';
import $ from 'jquery';
import { TOKEN, OnTokenLoad } from './token/identityToken';

class PictureBed extends Component {
    state = {  
        previewShow: false,
        previewUrl: "",
        images: [],
    } 

    componentDidMount() {
        OnTokenLoad(() => {
            $.ajax({
                url: "http://192.168.43.142/image/getImageList/",
                type: "get",
                headers: {
                    'Authorization': "Bearer " + TOKEN.access_token,
                },

                data: "",

                success: (resp) => {
                    console.log(resp.images);
                    this.setState({
                        images: resp.images,
                    });
                },
            });
        });
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
                        <div className="picturebed-head ">
                            <div className="picturebed-upload">
                                <div className="picturebed-upload-area">
                                    <div onClick={this.handleClickUpload} className="picturebed-upload-area-icon">
                                        <i className="bi bi-images"></i>
                                        <span>点此处选择图片</span>
                                        <input onChange={this.handleOnChangeUpload} type="file" className="image-upload" accept='image/*'/>
                                    </div>

                                    <div className="picturebed-upload-area-declare">
                                        <span className='declare-title'>注意事项</span>

                                        <ul className='declare-list'>
                                            <li>图片大小应小于10MB</li>
                                            <li>上传图片不会增加水印</li>
                                            <li>上传图片后需要等待一段时间后才可以访问</li>
                                            <li>你可以在你的图片列表里查看你上传的所有图片</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="picturebed-message">
                                <div className='picturebed-message-title'>图床信息</div>
                                <div className='message-item-container'>
                                    <span className='picturebed-message-item'>可用空间: </span>
                                    <span>200.00 MB</span>
                                </div>

                                <div className='message-item-container'>
                                    <span className='picturebed-message-item'>已使用空间: </span>
                                    <span>1.00 MB</span>
                                </div>

                                <div className='message-item-container'>
                                    <span className='picturebed-message-item'>图片数量: </span>
                                    <span>1 张</span>
                                </div>
                            </div>
                        </div>

                        <div className="picturebed-body">
                            <div className="picturedbed-body-head">
                                <h5>图片列表</h5>
                                <i onClick={this.handleClickUpdate} title='刷新' className="bi bi-funnel-fill"></i>
                            </div>

                            <div className="picturebed-body-list">
                                {
                                    this.state.images.map(image => {
                                        return (
                                            <PictureItem
                                                key={image.imageId}
                                                switchPreview={this.switchPreview}
                                                imageUpdate={this.handleClickUpdate}
                                                imageId={image.imageId}
                                                imageUrl={"http://192.168.43.142/" + image.imageUrl}
                                                imageSize={image.imageSize}
                                                imageCreateTime={image.imageCreateTime}
                                            />
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </PictureBedStyle>
                </Card>
            </React.Fragment>
        );
    }

    getCardStyle = () => {
        const style = {
            margin: "0 auto",
            minHeight: "35rem",
            width: "85%",
            backgroundColor: "white",
            boxShadow: "2px 1px 12px #DDDDDD",
        };

        return style;
    }

    switchPreview = (newstat, imageUrl) => {
        if(!imageUrl) imageUrl = "";
        this.setState({previewShow: newstat, previewUrl: imageUrl});
        console.log("11");
    }

    handleClickUpload = (e) => {
        document.querySelector(".image-upload").click();
    }

    handleOnChangeUpload = (e) => {
        console.log(e.target.files);
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
                    console.log(data);
                    
                    $.ajax({
                        url: "http://192.168.43.142/image/upload/",
                        type: "post",
                        headers: {
                            "Authorization": "Bearer " + TOKEN.access_token,
                        },
                        data: data,
                        processData: false,
                        contentType: false,

                        success: (resp) => {
                            console.log(resp);
                            if(resp.result === "success") {
                                this.handleClickUpdate();
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

    handleClickUpdate = () => {
        $.ajax({
            url: "http://192.168.43.142/image/getImageList/",
            type: "get",
            headers: {
                'Authorization': "Bearer " + TOKEN.access_token,
            },

            data: "",

            success: (resp) => {
                console.log(resp.images);
                this.setState({
                    images: resp.images,
                });
            },
        });
    }
}
 
const PictureBedStyle = styled.div`

    & .picturebed-head {
        height: 200px;
        border: 1px solid #E8E8E8;
        background-color: #CAD3C8;
        
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 20px;
        border-radius: 5px;
        box-shadow: 1px 2px 10px #CAD3C8;
    }

    & .picturebed-message {
        height: 120px;
        width: 30%;
        padding: 10px;
        border: 1px solid #E8E8E8;
        background-color: #f7f1e3;
        position: relative;
        border-radius: 5px;
        box-shadow: 1px 4px 10px #95A5A6;
    }

    & .picturebed-message-title {
        font-size: 18px;
        font-weight: bold;
    }

    & .message-item-container {
        display: flex;
        justify-content: space-between;
    }

    & .picturebed-message-item {
        font-size: 16px;
        color: #9D9D9D;
    }

    & .picturebed-message-item + span {
        font-size: 16px;
        color: #9D9D9D;
    }

    & .picturebed-upload {
        width: 65%;
    }

    & .picturebed-upload-area {
        width: 100%;
        height: 140px;
        background-color: #f7f1e3;
        margin-right: 2rem;
        border-radius: 5px;
        box-shadow: 1px 2px 10px #95A5A6;
        display: flex;
        /* justify-content: space-between; */
    }

    & .picturebed-upload-area-icon {
        width: 144px;
        height: 140px;
        background-color: #f7f1e3;
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
        border: 1px solid #E8E8E8;
        background-color: #CAD3C8;
        border-radius: 5px;
        box-shadow: 1px 4px 10px #CAD3C8;
    }

    & .picturedbed-body-head {
        display: flex;
        justify-content: space-between; 
    }

    & .picturedbed-body-head i {
        color: #3498DB;
        font-size: 22px;
    }

    & .picturedbed-body-head h5 {
        font-weight: bold;
    }

    & .picturebed-body-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
`

export default PictureBed;
