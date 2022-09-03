import React, { Component } from 'react';
import styled from 'styled-components';

class NotFound extends Component {
    state = {  } 
    render() { 
        return (
            <NotFoundStyle>
                <div className="notfound-message">404</div>

                <div className="notfound-link">
                        
                    <a className='notfound-backhome btn' href="/">
                        <i className="bi bi-house-fill"></i>
                        返回首页
                    </a>
                </div>
            </NotFoundStyle>
        );
    }
}
 
const NotFoundStyle = styled.div`
.notfound-message {
    color: #FF90D1;
    font-size: 20rem;
    font-weight: bold;
    font-family: Helvetica;
    text-shadow: 
        0 1px 0 #ccc, 
        0 2px 0 #c9c9c9, 
        0 3px 0 #bbb, 
        0 4px 0 #b9b9b9, 
        0 5px 0 #aaa, 
        0 6px 1px rgba(0,0,0,.1), 
        0 0 5px rgba(0,0,0,.1), 
        0 1px 3px rgba(0,0,0,.3), 
        0 3px 5px rgba(0,0,0,.2), 
        0 5px 10px rgba(0,0,0,.25), 
        0 10px 10px rgba(0,0,0,.2), 
        0 20px 20px rgba(0,0,0,.15);
}

.notfound-message {
    text-align: center;
}

.notfound-link {
    text-align: center;
}

& a {
    outline: 1px black solid;
}

& i {
    margin-right: 5px;
}

.notfound-backhome {
    text-decoration: none;
    color: black;
}

`

export default NotFound;