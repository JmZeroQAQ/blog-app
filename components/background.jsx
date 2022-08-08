import React, { Component } from 'react';

class BackGround extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <div style={this.getBackgroundStyle()}></div>
            </React.Fragment>
        );
    }

    getBackgroundStyle() {
        let style = {
            backgroundImage: "url('/images/backgroundimage.png')",
            width: "100%",
            height: "100%",
            position: "fixed",
            top: "0",
            left: "0",
            backgroundRepeat: "repeat",
            zIndex: "-10",
        }

        return style;
    }
}
 
export default BackGround;