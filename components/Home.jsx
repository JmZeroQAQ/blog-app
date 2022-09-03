import React, { Component } from 'react';
import Card from './base_unit/card';

class Home extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <Card style={this.getCardStyle()}>
                    <h3>Home</h3>
                </Card>
            </React.Fragment>
        );
    }

    getCardStyle = () => {
        const style = {
            margin: "0 auto",
            minHeight: "35rem",
            width: "85%",
            backgroundColor: "rgba(255, 255, 255, 10%)",
            boxShadow: "2px 1px 12px #DDDDDD",
        };

        return style;
    }
}
 
export default Home;