import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from './login';
import { connect } from 'react-redux';
import NavBarUser from './navbarUser';


class NavBar extends Component {
    state = {  
        active: "home",
    } 

    componentDidMount() {
        let url = window.location.href;
        if(url.search("/article") !== -1) {
            this.setState({active: "article"});
        }
    }

    render() { 
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light" style={{background: "linear-gradient(255deg, #FF90D1 20%, #7DC4CC 65%, #6190E8 75%)", fontSize: "18px"}}>
                    <div className="container" style={{width: "75%"}}>
                        <Link onClick={(e) => this.handleOnClickChangeActive('home')} className="navbar-link-item navbar-brand active" to="/">首页</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li style={this.getActiveStyle('home')} onClick={(e) => this.handleOnClickChangeActive('home')} className="nav-item">
                                    <Link className="navbar-link-item nav-link active" to="/">Home</Link>
                                </li>
                                <li style={this.getActiveStyle('article')} onClick={(e) => this.handleOnClickChangeActive('article')} className="nav-item">
                                    <Link className="navbar-link-item nav-link active" to="/article">文章</Link>
                                </li>

                                {this.getArticleEditor()}
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

    getActiveStyle(item) {
        let style = {
            marginRight: "30px",
        }

        if(this.state.active === item) {
            style = {
                ...style,
                fontWeight: "bold",
            }
        }

        return style;
    }

    handleOnClickChangeActive = (item) => {
        this.setState({active: item})
    }

    getArticleEditor() {
        if(this.props.userStat === 1) {
            return (
                <li style={this.getActiveStyle('editor')} onClick={(e) => this.handleOnClickChangeActive('editor')} className="nav-item">
                    <Link className="navbar-link-item nav-link active" to="/textEditor">新建文章</Link>
                </li>
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