import $ from 'jquery';
import { ajaxInit } from './refreshToken';

const TOKEN = {
    access_token: "",
    refresh_token: "",
};

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