import React, { Component } from 'react';

class NoticeToast extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <div className="shadow" style={this.getDivBoxStyle()}>
                    <div style={this.getHeadBoxStyle()}>
                        <span style={this.getColorRectStyle()}></span>
                        <span style={this.getTitleStyle()}> Notice </span>
                        <span style={{color: "#6C757D", fontSize: "12px"}}>just now</span>
                        <button onClick={this.props.handleClick} style={this.getButtonStyle()} className='btn-close'></button>
                    </div>
                    <div style={this.getBodyStyle()}>
                        <span style={{fontSize: "17px", fontWeight: "bold", color: "black"}}>{this.props.message}</span>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    getDivBoxStyle() {
        let style = {
            height: "5.2rem",
            width: "22rem",
            position: "fixed",
            backgroundColor: "rgba(255, 255, 255, .85)",
            backgroundClip: "border-box",
            borderRadius: "4px",
            border: "1px solid rgba(0, 0, 0, .1)",
            zIndex: "1060",
            right: "16px",
            bottom: "18px",
        }

        return style;
    }

    getHeadBoxStyle() {
        let style = {
            height: "45%",
            display: "flex",
            color: "#6c757d",
            backgroundColor: "rgba(255, 255, 255, .85)",
            alignItems: "center",
            padding: "0.5rem 0.55rem",
            backgroundClip: "padding-box",
            borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
        }

        return style;
    }

    getColorRectStyle() {
        let RectColor = "#007AFF";
        if(this.props.messageType === "warning") {
            RectColor = "red";
        }

        let style = {
            display: "inline-block",
            width: "20px",
            height: "20px",
            backgroundColor: RectColor,
            borderRadius: "5px",
            marginRight: "8px",
        }

        return style;
    }

    getTitleStyle() {
        let style = {
            color: "#6C757D",
            fontSize: "14px",
            fontWeight: "bold",
            marginRight: "auto",
        }

        return style;
    }

    getButtonStyle() {
        let style = {
            width: "21px",
            height: "21px",
            marginLeft: "10px",
            padding: "0",
            position: "relative",
            left: "4px",
        }

        return style;
    }

    getBodyStyle() {
        let style = {
            color: "#212529",
            height: "55%",
            width: "100%",
            padding: ".55rem",
            wordWrap: "break-word",
            fontSize: "15px",
            backgroundColor: "rgba(255, 255, 255, .85)",
        }

        return style;
    }
}
 
export default NoticeToast;