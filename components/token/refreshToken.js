import { TOKEN } from "./identityToken"
import $ from 'jquery';
import { store } from '../redux/store';
import { ACTIONS } from "../redux/action";


let refreshEventId = -1;


const refreshToken = () => {
    $.ajax({
        url: "http://192.168.43.142/token/refresh/",
        type: "post",
        data: {
            refresh: TOKEN.refresh_token,
        },

        success: (resp) => {
            TOKEN.access_token = resp.access;
        },

        // 刷新令牌过期了
        error: (resp) => {
            console.log(resp);
            TOKEN.access_token = "";
            TOKEN.refresh_token = "";
            localStorage.removeItem("refresh_token");
            if(refreshEventId !== -1) {
                clearInterval(refreshEventId);
                console.log("清除周期函数");
                refreshEventId = -1;
            }

            store.dispatch({type: ACTIONS.changeUserStat, newStat: 0});
        },
    })
};

const add_listening_events_refresh = () => {
    refreshToken();

    if(TOKEN.refresh_token !== "") {
        localStorage.setItem("refresh_token", TOKEN.refresh_token);
        store.dispatch({type: ACTIONS.changeUserStat, newStat: 1});

        refreshEventId = setInterval(() => {
            refreshToken();
        }, 4.5 * 60 * 1000);// unit: ms
    }
};

export {
    add_listening_events_refresh,
}