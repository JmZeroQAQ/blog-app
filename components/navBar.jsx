import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from './login';
import { connect } from 'react-redux';
import NavBarUser from './navbarUser';

class NavBar extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#FF90D1"}}>
                    <div className="container" style={{width: "75%"}}>
                        <Link className="navbar-link-item navbar-brand active" to="/">首页</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item" style={{marginRight: "30px"}}>
                                <Link className="navbar-link-item nav-link active" to="/">Home</Link>
                                </li>
                                <li className="nav-item" style={{marginRight: "30px"}}>
                                <Link className="navbar-link-item nav-link active" to="/article">文章</Link>
                                </li>
                            </ul>

                            <ul className="navbar-nav mb-2 mb-lg-0">
                                {this.userLogin()}
                            </ul>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }

    userLogin() {
        if(this.props.userStat === 0) {
            return (
                <li className="nav-item">
                    <Login />
                </li>
            );
        }

        else {
            return (
                <NavBarUser />
            );
        }
    }
}

const mapStateToProps = (state, props) => {
    return {
        userStat: state.userStat,
    }
}
export default connect(mapStateToProps)(NavBar);