import { TOKEN } from "./identityToken"
import $ from 'jquery';
import { store } from '../redux/store';
import { ACTIONS } from "../redux/action";
import { requestUrl } from '../../API/requestUrl';


let refreshEventId = -1;
let ajaxInit = -1;


const refreshToken = () => {
    $.ajax({
        url: `${requestUrl}/token/refresh/`,
        type: "post",
        data: {
            refresh: TOKEN.refresh_token,
        },

        success: (resp) => {
            TOKEN.access_token = resp.access;
        },

        // 刷新令牌过期了
        error: (resp) => {
            TOKEN.access_token = "";
            TOKEN.refresh_token = "";
            // localStorage.removeItem("refresh_token");
            if(refreshEventId !== -1) {
                clearInterval(refreshEventId); // 清理周期函数
                refreshEventId = -1;
            }

            store.dispatch({type: ACTIONS.changeUserStat, newStat: 0});
        },
    })
};

const add_listening_events_refresh = () => {

    ajaxInit =  $.ajax({
        url: `${requestUrl}/token/refresh/`,
        type: "post",
        data: {
            refresh: TOKEN.refresh_token,
        },

        success: (resp) => {
            TOKEN.access_token = resp.access;

            localStorage.setItem("refresh_token", TOKEN.refresh_token);
            store.dispatch({type: ACTIONS.changeUserStat, newStat: 1});

            refreshEventId = setInterval(() => {
                refreshToken();
            }, 4.5 * 60 * 1000);// unit: ms
        },

        // 刷新令牌过期了
        error: (resp) => {
            TOKEN.access_token = "";
            TOKEN.refresh_token = "";
            // localStorage.removeItem("refresh_token");
            localStorage.clear();

            store.dispatch({type: ACTIONS.changeUserStat, newStat: 0});
        },
    })
};

export {
    add_listening_events_refresh,
    ajaxInit,
}