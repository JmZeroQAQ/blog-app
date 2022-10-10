import React, { Component } from 'react';
import $ from 'jquery';
import { TOKEN, OnTokenLoad } from '../token/identityToken';
import { requestUrl } from '../../API/requestUrl';
import styled from 'styled-components';

class PicturebedMessage extends Component {
    state = {  
        imageMaxSize: 0,
        imageCurrentSize: 0,
        imageCount: 0,
    } 

    componentDidMount() {
        OnTokenLoad(() => {
            $.ajax({
                url: `${requestUrl}/image/getUserImageInfo`,
                type: "get",
                headers: {
                    'Authorization': "Bearer " + TOKEN.access_token,
                },
                
                success: (resp) => {
                    if(resp.result === "success") {
                        this.setState({
                            imageMaxSize: resp.imageMaxSize,
                            imageCurrentSize: resp.imageCurrentSize,
                            imageCount: resp.imageCount,
                        });
                    }
                    else {
                        window.location.href = '/404';
                    }
                }
            })
        });
    }

    componentDidUpdate() {
        if(this.props.isUpdate) {
            $.ajax({
                url: `${requestUrl}/image/getUserImageInfo`,
                type: "get",
                headers: {
                    'Authorization': "Bearer " + TOKEN.access_token,
                },
                
                success: (resp) => {
                    if(resp.result === "success") {
                        this.setState({
                            imageMaxSize: resp.imageMaxSize,
                            imageCurrentSize: resp.imageCurrentSize,
                            imageCount: resp.imageCount,
                        });
                    }
                    else {
                        window.location.href = '/404';
                    }
                }
            });

            this.props.switchIsUpdate();
        }
    }

    render() { 
        return (
            <React.Fragment>
                <PicturebedMessageStyle>
                    <div className='picturebed-message-title'>图床信息</div>
                    <div className='message-item-container'>
                        <span className='picturebed-message-item'>可用空间: </span>
                        <span>{this.state.imageMaxSize}MB</span>
                    </div>

                    <div className='message-item-container'>
                        <span className='picturebed-message-item'>已使用空间: </span>
                        <span>{this.state.imageCurrentSize}MB</span>
                    </div>

                    <div className='message-item-container'>
                        <span className='picturebed-message-item'>图片数量: </span>
                        <span>{this.state.imageCount} 张</span>
                    </div>
                </PicturebedMessageStyle>
            </React.Fragment>
        );
    }
}
 
export default PicturebedMessage;

const PicturebedMessageStyle = styled.div`
    & {
        width: 100%;
        background-color: white;
        border: 1px solid #95A5A6;
        border-radius: 5px;
        padding: 10px;
    }

    & .picturebed-message-title {
        font-size: 18px;
        font-weight: bold;
    }

    & .message-item-container {
        /* background-color: red; */
    }

    & .picturebed-message-item {
        font-size: 16px;
        color: #9D9D9D;
    }

    & .picturebed-message-item + span {
        font-size: 16px;
        color: #9D9D9D;
    }
`