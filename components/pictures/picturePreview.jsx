import React, { Component } from 'react';
import styled, {keyframes} from 'styled-components';
import PictureModal from '../base_unit/baseModal';

class PicturePreview extends Component {
    state = {  
        enlarge: false,
        cursorStyle: "zoom-in",
    } 

    componentDidMount() {
        // 让背景聚焦
        document.querySelector('.modal-picture-background').focus();
    }

    render() { 
        return (
            <React.Fragment>
                <PictureModal>
                    <PicturePreviewStyle
                        cursorStyle={this.state.cursorStyle}
                        enlarge={this.state.enlarge}
                        onClick={e => this.handleClickBackground(e)}
                        onKeyDown = {e => e.key === 'Escape' ? this.handleClickBackground(e) : null}
                    >
                        <img onClick={e => this.handleClickImage(e)} src={this.props.imageUrl} alt="" />
                    </PicturePreviewStyle>
                </PictureModal>
            </React.Fragment>
        );
    }

    handleClickImage = (e) => {
        e.stopPropagation();
        this.state.enlarge ? this.setState({enlarge: false, cursorStyle: "zoom-in"}) : this.setState({enlarge: true, cursorStyle: "zoom-out"});
    }

    handleClickBackground = (e) => {
        this.props.switchPreview(false);
    }
}

const ImageAnimation = keyframes`
    0% {
        max-width: 60%;
        max-height: 60%;
    }

    100% {
        max-width: 75%;
        max-height: 75%;
    }
`

const PicturePreviewStyle = styled.div.attrs(props => {
    return {
        tabIndex: -1,
        className: "modal-picture-background",
    };
})`
    & {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    &  img {
        max-width: ${props => props.enlarge ? "100%" : "75%"};
        max-height: ${props => props.enlarge ? "100%" : "75%"};
        position: absolute;
        overflow: auto;
        cursor: ${props => props.cursorStyle};

        animation: ${ImageAnimation} 800ms;

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`
 
export default PicturePreview;