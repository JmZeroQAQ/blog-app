import React, { Component } from 'react';
import $ from 'jquery';
import { TOKEN } from './token/identityToken';
import { add_listening_events_refresh } from './token/refreshToken';
import { ACTIONS } from './redux/action';
import { connect } from 'react-redux';
import { loginModal } from './base_unit/Modal/loginModal';
import { requestUrl } from '../API/requestUrl';

class Login extends Component {
    state = {  
        error_message: "",
    } 

    render() { 
        return (
            <React.Fragment>
                <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" style={{marginTop: "10%"}}>
                        <div className="modal-content modal-login">
                            <div className="modal-header">
                                <h5 className="modal-title">登录</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input 
                                    type="text" 
                                    className="form-control login-username" 
                                    placeholder='用户名' 
                                    maxLength={10}
                                />
                                <input 
                                    style={{marginTop: "1rem"}} 
                                    type="password" 
                                    className="form-control login-password" 
                                    placeholder='密码' 
                                    maxLength={18}
                                />

                                <div className="error-message" style={{color: "red", fontSize: "14px", marginTop: "10px", textAlign: "right"}}>
                                    {this.state.error_message}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.handleButtonClickLogin} style={{width: "100%"}} type="button" className="btn btn-primary">登录</button>
                                <div onClick={this.handleClickModalLogin} className="d-none login-modal-footer-register" style={{cursor: 'pointer'}}>注册</div>
                            </div>
                        </div>

                        <div className="modal-content modal-register">
                            <div className="modal-header">
                                <h5 className="modal-title">注册</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input type="text" className="form-control register-username" maxLength={10} placeholder='用户名' />
                                <input 
                                    style={{marginTop: "1rem"}} type="password" 
                                    className="form-control register-password" placeholder='密码' 
                                    maxLength={18}
                                />
                                <input 
                                    style={{marginTop: "1rem"}} type="password" 
                                    className="form-control register-passwordconfirm" placeholder='确认密码' 
                                    maxLength={18}
                                />

                                <div className="error-message" style={{color: "red", fontSize: "14px", marginTop: "10px", textAlign: "right"}}>
                                    {this.state.error_message}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.handleButtonClickRegister} style={{width: "100%"}} type="button" className="btn btn-primary">注册</button>
                                <div onClick={this.handleClickModalRegister} className={'login-modal-footer-login'} style={{cursor: 'pointer'}}>登录</div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    handleClickLogin() {

    }

    // 显示注册
    handleClickModalLogin = () => {
        this.setState({error_message: ""});
        $('.modal-login').hide();
        $('.modal-register').show();
    }
    // 显示登录
    handleClickModalRegister = () => {
        this.setState({error_message: ""});
        $('.modal-login').show();
        $('.modal-register').hide();
    }

    handleButtonClickLogin = () => {
        let username, password;
        let $username = $('.login-username');
        let $password = $('.login-password');
        username = $username.val();
        password = $password.val();

        $password.val("");
        
        $.ajax({
            url: `${requestUrl}/token/`,
            type: "post",
            data: {
                username,
                password,
            },

            success: resp => {
                TOKEN.access_token = resp.access;
                TOKEN.refresh_token = resp.refresh;
                
                // 登录成功后创建一个周期事件,每4.5min刷新一次令牌
                add_listening_events_refresh();
                
                loginModal.hideModal();
            },

            error: () => {
                this.setState({error_message: "账号或密码错误"});

                setTimeout(() => {
                    this.setState({error_message: ""});
                }, 5 * 1000);
            },
        });
    }

    handleButtonClickRegister = () => {
        let username, password, password_confirm;
        let $username = $('.register-username');
        let $password = $('.register-password');
        let $password_confirm = $('.register-passwordconfirm');

        username = $username.val();
        password = $password.val();
        password_confirm = $password_confirm.val();
        
        $password.val("");
        $password_confirm.val("");

        if(username === "") {
            this.setState({error_message: "用户名为空"});
            return false;
        }

        if(password.length < 6) {
            this.setState({error_message: "密码长度小于6位"});
            return false;
        }

        if(password !== password_confirm) {
            this.setState({error_message: "两次密码不一致"})
            return false;
        }

        $.ajax({
            url: `${requestUrl}/user/register/`,
            type: "POST",
            data: {
                username,
                password,
                password_confirm,
            },

            success: (resp) => {
                if(resp.result !== 'success')
                    this.setState({error_message: resp.result});
                else {
                    this.handleClickModalRegister();
                }
            },
        });
    }
}

const mapDispatchToProps = {
    changeUserStat: (newStat) => {
        return {
            type: ACTIONS.changeUserStat,
            newStat,
        }
    }
}

export default connect(null, mapDispatchToProps)(Login);