import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#FF90D1"}}>
                    <div className="container">
                        <Link className="navbar-brand active" to="/">首页</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            <Link className="nav-link active" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link active" to="/article">文章</Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                            <Link className="nav-link active" to="/login">登录</Link>
                            </li>
                        </ul>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}
 
export default NavBar;