import $ from 'jquery';
import { ajaxInit } from './refreshToken';

const TOKEN = {
    access_token: "",
    refresh_token: "",
};

// 传入一个callback，如果Token已获取，直接执行该callback，否则等Token获取后再执行callback
// flag 表示当未登录的时候是否继续发送请求
const OnTokenLoad = function(callback) {
    if(TOKEN.access_token !== "") {
        callback();
    }

    else if(TOKEN.refresh_token !== ""){
        $.when(ajaxInit).done(() => {
            callback();
        });
    }
}

const OnTourist = function(callback) {
    if(TOKEN.refresh_token === "") {
        callback();
    }
}

export {
    TOKEN,
    OnTokenLoad,
    OnTourist,
}