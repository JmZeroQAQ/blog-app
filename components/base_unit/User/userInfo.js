const UserInfo = {
    username: "",
    userAvatar: "",
    background: "",
}

// 当用户信息加载完后触发
let UserInfoOnLoadEvent = new CustomEvent("userInfoOnLoad", {detail: {name: "onLoad"}});

const User = {
    setUserName: (username) => {
        UserInfo.username = username;
    },

    setUserAvatar: (userAvatar) => {
        UserInfo.userAvatar = userAvatar;
    },

    setBackgroundUrl: (backgroundUrl) => {
        UserInfo.background = backgroundUrl;
        // 暂时放在这里吧
        window.dispatchEvent(UserInfoOnLoadEvent);
    },

    getUserName: () => {
        return UserInfo.username;
    },

    getUserAvatar: () => {
        return UserInfo.userAvatar;
    },

    getBackgroundUrl: () => {
        return UserInfo.background;
    }
}

const OnUserInfoLoad = (callback) => {
    if(UserInfo.username !== "") {
        callback();
    }
    else {
        window.addEventListener("userInfoOnLoad", (e) => {
            callback();
        });
    }
}

export {
    User,
    OnUserInfoLoad,
}