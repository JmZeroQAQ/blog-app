import React, { Component } from 'react';
import { User, OnUserInfoLoad } from './base_unit/User/userInfo';

class BackGround extends Component {
    state = {  
        backgroundUrl: "",
    } 

    componentDidMount() {
        OnUserInfoLoad(() => {
            this.setState({backgroundUrl: User.getBackgroundUrl()})
        });
    }

    render() { 
        return (
            <React.Fragment>
                <div style={this.getBackgroundStyle()}></div>
            </React.Fragment>
        );
    }

    getBackgroundStyle() {
        let style = {
            backgroundImage: `url(${this.state.backgroundUrl})`,
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