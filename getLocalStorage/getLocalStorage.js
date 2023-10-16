import { TOKEN } from "../components/token/identityToken";
import { add_listening_events_refresh } from "../components/token/refreshToken";

const GetLocalStorage = () => {
    if(localStorage.getItem("refresh_token")) {
        TOKEN.refresh_token = localStorage.getItem("refresh_token");
        add_listening_events_refresh();
    }
}

export {
    GetLocalStorage,
}