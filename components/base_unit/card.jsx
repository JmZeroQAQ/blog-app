import React, { Component } from 'react';

class Card extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <div className='row'>
                    <div style={this.props.style} className="card position-relative">
                        <div className="card-body">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Card;