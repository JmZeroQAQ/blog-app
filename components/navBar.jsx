import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBarUser from './navbarUser';
import $ from 'jquery';
import {loginModal} from './base_unit/Modal/loginModal';
import styled from 'styled-components';

class NavBar extends Component {
    state = {  } 

    render() { 
        return (
            <React.Fragment>
                <nav className="home-navbar navbar navbar-expand-lg  navbar-dark bg-dark" style={{fontSize: "18px", zIndex:12, position: "fixed", width: "100vw", height: "auto", top: "0"}}>
                    <NavBarDivStyle>
                        <Link className=" navbar-home navbar-brand active" to="/">
                            <img src={require('../images/home.png')} alt="home" />
                        </Link>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item navbar-item">
                                    <Link className="nav-link navbar-article" to="/article">文章</Link>
                                </li>

                                {this.getLoginNavbar()}
                            </ul>

                            <ul className="navbar-nav mb-2 mb-lg-0">
                                {this.userLogin()}
                            </ul>
                        </div>
                    </NavBarDivStyle>
                </nav>
            </React.Fragment>
        );
    }

    userLogin() {
        if(this.props.userStat === 0) {
            return (
                <li className="nav-item">
                    <div onClick={this.handleClickLogin} className="login-item nav-link" style={{cursor: "pointer"}}>
                        登录
                    </div>
                </li>
            );
        }

        else {
            return (
                <NavBarUser />
            );
        }
    }

    handleClickLogin = () => {
        loginModal.showModal();

        $('.modal-login').show();
        $('.modal-register').hide();
    }

    getLoginNavbar() {
        if(this.props.userStat === 1) {
            return (
                <React.Fragment>
                    <li className="nav-item navbar-item">
                    <Link className="nav-link navbar-create" to="/textEditor">新建文章</Link>
                    </li>

                    <li className="nav-item navbar-item">
                    <Link className="nav-link navbar-picturebed" to="/picturebed">图床</Link>
                    </li>
                </React.Fragment>
            );
        }
    }
}

const NavBarDivStyle = styled.div.attrs(props => {
    return {
        className: "container",
    };
})`
    width: 75%;

    & .navbar-home > img {
        width: 84px;
        height: 36px;
    }

    & .navbar-item {
        margin-right: 1.2rem;
        font-size: 20px;
        color: black;
        font-weight: 500;
    }
`

const mapStateToProps = (state) => {
    return {
        userStat: state.userStat,
    }
}
export default connect(mapStateToProps)(NavBar);