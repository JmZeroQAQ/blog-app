const UserInfo = {
    username: "",
    userAvatar: "",
}

const User = {
    setUserName: (username) => {
        UserInfo.username = username;
    },

    setUserAvatar: (userAvatar) => {
        UserInfo.userAvatar = userAvatar;
    },

    getUserName: () => {
        return UserInfo.username;
    },

    getUserAvatar: () => {
        return UserInfo.userAvatar;
    },
}

export {
    User,
}