import React, { Component } from 'react';
import Card from '../base_unit/card';


class TextEditor extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <Card style={this.getCardStyle()}>
                    
                </Card>
            </React.Fragment>
        );
    }

    getCardStyle = () => {
        const style = {
            margin: "0 auto",
            minHeight: "35rem",
            backgroundColor: "rgba(255, 255, 255, 75%)",
        };

        return style;
    }
}
 
export default TextEditor;