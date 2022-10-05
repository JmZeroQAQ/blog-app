import React, { Component } from 'react';
import $ from 'jquery';
import { TOKEN, OnTokenLoad } from '../token/identityToken';

class PicturebedMessage extends Component {
    state = {  
        imageMaxSize: 0,
        imageCurrentSize: 0,
        imageCount: 0,
    } 

    componentDidMount() {
        OnTokenLoad(() => {
            $.ajax({
                url: "http://150.158.182.65/image/getUserImageInfo",
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
                        console.log(resp.result);
                    }
                }
            })
        });
    }

    componentDidUpdate() {
        if(this.props.isUpdate) {
            $.ajax({
                url: "http://150.158.182.65/image/getUserImageInfo",
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
                        console.log(resp.result);
                    }
                }
            });

            this.props.switchIsUpdate();
        }
    }

    render() { 
        return (
            <React.Fragment>
                <div className="picturebed-message">
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
                </div>
            </React.Fragment>
        );
    }
}
 
export default PicturebedMessage;