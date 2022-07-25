import React, { Component } from 'react';

class Row extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <div className="row" style={this.getRowStyle()}>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }

    getRowStyle = () => {
        const style = {
            padding: "10px",
        };

        return style;
    }
}
 
export default Row;