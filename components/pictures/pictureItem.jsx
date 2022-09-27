import React, { Component } from 'react';
import styled, {keyframes} from 'styled-components';
import $ from 'jquery';
import { TOKEN } from '../token/identityToken';

class PictureItem extends Component {
    state = {  
        hoverSwitch: false,
    } 

    render() { 
        return (
            <React.Fragment>
                <PictureItemStyle onMouseEnter={() => this.setState({hoverSwitch: true})} onMouseLeave={() => this.setState({hoverSwitch: false})}>
                    {this.getHoverItem()}

                    <div className="images-head">
                        <div className="images-head-display">
                            <img onClick={e => this.onClickHandleImage(e)} src={this.props.imageUrl} />
                        </div>
                    </div>
                    <div className="images-message">
                        <span className='images-message-item'>{this.props.imageCreateTime}</span>
                        <span className='images-message-item'>{this.props.imageSize}MB</span>

                        <span onClick={this.handleClickCopy} title='复制' className="images-copy-icon">
                            <i className="bi bi-clipboard2-fill"></i>
                            <i className="bi bi-markdown-fill"></i>
                        </span>
                    </div>
                </PictureItemStyle>
            </React.Fragment>
        );
    }

    getHoverItem() {
        if(this.state.hoverSwitch) {
            return(
                <React.Fragment>
                    <div className="images-hover-items">
                        <span className='images-hover-item-square'> </span>
                        <i onClick={this.handleClickDelete} className="images-hover-items-trash bi bi-trash-fill"></i>
                    </div>
                </React.Fragment>
            );
        }
    }

    onClickHandleImage = (e) => {
        this.props.switchPreview(true, this.props.imageUrl);
    }

    handleClickDelete = (e) => {
        console.log("delete Image");
        $.ajax({
            url: "http://192.168.43.142/image/deleteImage/",
            type: "get",
            headers: {
                'Authorization': "Bearer " + TOKEN.access_token,
            },

            data: {
                'imageId': this.props.imageId,
            },

            success: (resp) => {
                console.log(resp);
                this.props.imageUpdate();
            }
        })
    }

    handleClickCopy = (e) => {
        let copyContent = `![](${this.props.imageUrl}) `;
        let input = document.createElement("input");
        input.setAttribute("value", copyContent);
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
    }
}
 

const showAnimation = keyframes`
    0% {
        opacity: 0%;
    }

    100% {
        opacity: 100%;
    }
`

const PictureItemStyle = styled.div`
    & {
        width: 230px;
        height: 200px;
        padding: 12px 12px 4px;
        margin: 12px;
        background-color: #FAFAFA;
        border-radius: 5px;
        border: 1px solid #E8E8E8;
        box-sizing: border-box;
        box-shadow: 1px 2px 5px #95A5A6;
        position: relative;
    }

    &:hover {
        border: 1px solid #89D1F5;
        box-shadow: 1px 2px 12px #3CB2D6;
    }

    & .images-head {
        width: 100%;
        height: 90%;
    }

    & .images-head-display {
        width: 100%;
        height: 100%;
        position: relative;
        box-sizing: border-box;
    }

    & .images-head-display img {
        max-height: 100%;
        max-width: 100%;
        position: absolute;
        border: 1px solid #E8E8E8;
        cursor: pointer;

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    & .images-message {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    & .images-message-item {
        font-size: 13px;
        color: #595959;
    }

    & .images-hover-items {
        width: 90%;
        display: flex;
        justify-content: space-between;
        position: absolute;
        z-index: 5;
        animation: ${showAnimation} 800ms;
    }

    & .images-copy-icon {
        cursor: pointer;
    }

    & .images-copy-icon i {
        color: #595959;
    }

    & .images-hover-item-square {
        width: 16px;
        height: 16px;
        display: block;
        border: 3px solid #3498DB;
        box-sizing: border-box;
    }

    & .images-hover-items-trash {
        color: #E74C3C;
        font-size: 18px;
        cursor: pointer;
    }

`
export default PictureItem;