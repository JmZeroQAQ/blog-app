import React, { Component } from 'react';

class ModifyIcon extends Component {
    state = {  
        hover: false,
    } 

    render() { 
        return (
            <React.Fragment>
                <div style={this.getDivStyle()}>
                    <span 
                    onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} 
                    onClick={this.handleClickModify}
                    className="bi bi-pencil-fill"
                    ></span>
                </div>
            </React.Fragment>
        );
    }

    getDivStyle() {
        if(this.props.block) {
            return {};
        }

        let style = {
            ...this.props.style,
        };

        if(this.state.hover) {
            style = {
                ...style,
                color: "lightskyblue",
                transform: "scale(1.2)",
                transition: "300ms",
            }
        }

        return style;
    }

    handleClickModify = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        console.log("123");
    }

    handleMouseEnter = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        this.setState({hover: true});
    }

    handleMouseLeave = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        this.setState({hover: false});
    }
}
 
export default ModifyIcon;