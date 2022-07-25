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
            backgroundColor: "rgba(255, 255, 255, 0%)",
        };

        return style;
    }
}
 
export default Home;