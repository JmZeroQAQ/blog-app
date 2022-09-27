import { ACTIONS } from "./action";

const reducer = (state = {
    userStat: 0, // 0 表示未登录 1 表示已登录
}, action) => {
    switch(action.type) {
        case ACTIONS.changeUserStat:
            return {
                ...state,
                userStat: action.newStat,
            };

        default:
            return state;
    }
};

export {
    reducer
}