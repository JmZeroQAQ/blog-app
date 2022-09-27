import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

class PictureModal extends Component {
    
    constructor(props) {
        super(props);
        this.state = {    };
        this.node = document.createElement('div');
        document.body.appendChild(this.node);
    }
    
    render() { 
        return createPortal(
            <PictureModalStyle>
                {this.props.children}
            </PictureModalStyle>
            , this.node
        );
    }

    componentWillUnmount() {
        document.body.removeChild(this.node);
    }
}

const PictureModalStyle = styled.div`
    & {
        width: 100vw;
        height: 100vh;
        overflow: auto;
        background-color: rgba(0, 0, 0, 20%);
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1500;
    }
`
 
export default PictureModal;