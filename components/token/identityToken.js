import $ from 'jquery';
import { ajaxInit } from './refreshToken';

const TOKEN = {
    access_token: "",
    refresh_token: "",
};

// 传入一个callback，如果Token已获取，直接执行该callback，否则等Token获取后再执行callback
const OnTokenLoad = function(callback) {
    if(TOKEN.access_token !== "") {
        callback();
    }

    else {
        $.when(ajaxInit).done(() => {
            callback();
        })
    }
}

export {
    TOKEN,
    OnTokenLoad,
}