import config from "./clientConfig";

export function handleLogin(user) {
    if (user) {
        localStorage.setItem(config.loginUser, JSON.stringify(user));
    }
}

export function getLocalUser() {
    const userData = localStorage.getItem(config.loginUser);
    let user = null;
    if (userData) {
        user = JSON.parse(userData);
    }
    return user;
}