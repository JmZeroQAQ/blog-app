import React, { Component } from 'react';

class EditorResizable extends Component {
    state = {  
        isDown: false,
        onComDown: false,
        lastHeight: 0,
    } 

    minHeight = 416;

    render() { 
        return (
            <React.Fragment>
                <div 
                    className='resizable'
                    onMouseDown={(e) => this.onMouseDown(e)}
                    style = {this.getResizableStyle()}
                >
                </div>
                <i
                    style={{float: "right", width: "20px", position: "relative", bottom: "16px", left: "4px"}}
                    className="bi bi-arrows-expand" 
                    title="拖拽调节窗口大小">
                </i>
            </React.Fragment>
        );
    }

    onMouseDown = (e) => {
        this.setState({isDown: true, lastHeight: e.clientY})
        document.querySelector(`body`).style.cursor = 's-resize';

        window.onmousemove = (e) => {
            
            let height = this.getTop(document.querySelector('.resizable'));
            if(e.clientY >= height + 5 && !this.state.onComDown) this.setState({onComDown: true});

            if(this.state.isDown && this.state.onComDown) {
                let dy = e.clientY - this.state.lastHeight;
                if(this.props.editorHeight + dy <= this.minHeight) {
                    this.setState({onComDown: false});
                    dy = 0;
                }
                this.props.changeEditorHeight(dy);
            }

            this.setState({lastHeight: e.clientY});
        }

        window.onmouseup = () => {
            this.setState({isDown: false});
            document.querySelector(`body`).style.cursor = '';
            window.onmouseup = null;
            window.onmousemove = null;
        }
    }

    getTop(e) {
        let offset = e.offsetTop;
        if(e.offsetParent != null) offset += this.getTop(e.offsetParent);
        return offset;
    }

    getResizableStyle() {
        const style = {
            width: "calc(100% - 18px)",
            height: "10px",
            cursor: "s-resize",
            WebkitUserSelect: "none",
            resize: "both",
            backgroundColor: "#FBF1D3",
        }

        return style;
    }
}
 
export default EditorResizable;