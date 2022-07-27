import React, { Component } from 'react';

class Collapse extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <div className="aside_collapse">
                    <p>
                        <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#aside_tools" aria-expanded="false">
                            <span>
                            <i className="bi bi-grid-fill"></i>
                            </span>
                        </button>
                    </p>
                    <div style={{minHeight: "120px", minWidth: "13rem"}}>
                        <div className="collapse collapse-horizontal" id="aside_tools">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}
 
export default Collapse;