import React, { Component } from 'react';
import { User, OnUserInfoLoad } from './base_unit/User/userInfo';
import { OnTourist } from './token/identityToken';

class BackGround extends Component {
    state = {  
        backgroundUrl: "",
    } 

    componentDidMount() {

        OnTourist(() => {
            this.setState({backgroundUrl: "https://ranunculus.top/media/images/2022110909350878.png"});
        });

        OnUserInfoLoad(() => {
            this.setState({backgroundUrl: User.getBackgroundUrl()});
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