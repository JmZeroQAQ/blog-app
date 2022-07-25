import React, { Component } from 'react';
import Card from './base_unit/card';

class Login extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <Card style={this.getCardStyle()}>
                    <h3>Login</h3>
                </Card>
            </React.Fragment>
        );
    }

    getCardStyle = () => {
        const style = {
            margin: "0 auto",
            minHeight: "35rem",
            backgroundColor: "rgba(255, 255, 255, 50%)",
        };

        return style;
    }
}
 
export default Login;