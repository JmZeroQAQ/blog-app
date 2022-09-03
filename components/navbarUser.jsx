import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Logout } from './token/clearToken';
import $ from 'jquery';
import { TOKEN } from './token/identityToken';
import { ACTIONS } from './redux/action';
import { connect } from 'react-redux';

class NavBarUser extends Component {
    state = {  } 

    componentDidMount() {
        // console.log("TOKEN", TOKEN.access_token, TOKEN.refresh_token);
        $.ajax({
            url: "http://192.168.43.142/user/getinfo/",
            type: "get",
            headers: {
                'Authorization': "Bearer " + TOKEN.access_token,
            },

            success: (resp) => {
                if(resp.result === "success") {
                    let username = resp.username;
                    this.props.setUserInfo({username});
                }
                else {
                    console.log("获取用户信息失败");
                }
            }, 
        });
    }

    render() { 
        return (
            <React.Fragment>
                <li className="nav-item dropdown">
                    <a style={{padding: "0px"}} className="nav-link dropdown-toggle" href='/' id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown">
                        <img style={{width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover"}} src='/images/avatar.jpg' alt="头像" />
                        <span className='fillSpace'> </span>
                    </a>
                    <ul className="dropdown-menu navbar-user-dropdown" style={{margin: "0"}}>
                        <li style={{fontSize: "16px", marginLeft: "20px", fontWeight: "bold", userSelect: "none"}}><div>
                            {this.props.userInfo.username || "JmZeroQAQ"}
                        </div></li>
                        <li><div><hr style={{margin: "5px 0px 10px 0px"}} /></div></li>
                        <DropItemStyle><Link className='dropdown-item-link' to='/'>个人信息</Link></DropItemStyle>
                        <DropItemStyle><Link className='dropdown-item-link' to='/'>我的空间</Link></DropItemStyle>
                        <DropItemStyle><Link className='dropdown-item-link' to='article/index'>文章管理</Link></DropItemStyle>
                        <DropItemStyle><Link className='dropdown-item-link' to='/'>图床</Link></DropItemStyle>
                        <li><div><hr style={{margin: "5px 0px 10px 0px"}} /></div></li>
                        <DropItemStyle><div className='dropdown-item' onClick={this.handleClickLogout}>退出</div></DropItemStyle>
                    </ul>
                </li>
            </React.Fragment>
        );
    }

    handleClickLogout() {
        Logout();
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    };
}

const mapDispatchToProps = {
    setUserInfo: (userInfo) => {
        return {
            type: ACTIONS.setUserInfo,
            username: userInfo.username,
        };
    }
}
 
const DropItemStyle = styled.li`
    font-size: 14px;
    cursor: pointer;

    .dropdown-item-link {
        padding: 2px 20px 2px 20px;
        display: block;
        text-decoration: none;
        font-size: 14px;
        color: black;
    }

    .dropdown {
        padding: 2px 20px 2px 20px;
        font-size: 14px;
        color: black;
    }

    li a{
        display: block;
    }

    &:hover {
        background-color: #E3E5E7;
        transition: 400ms;
    }
`


export default connect(mapStateToProps, mapDispatchToProps)(NavBarUser);
