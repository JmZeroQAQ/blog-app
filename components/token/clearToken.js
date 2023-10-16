
const Logout = () => {
    localStorage.clear();
    window.location.href = "/";
}

export {
    Logout,
}