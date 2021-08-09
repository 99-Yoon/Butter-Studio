import clientConfig from "./clientConfig";

export function handleLogin(user) {
    if (user) {
        localStorage.setItem(clientConfig.loginUser, JSON.stringify(user));
    }
}

export function getLocalUser() {
    const userData = localStorage.getItem(clientConfig.loginUser);
    let user = null;
    if (userData) {
        user = JSON.parse(userData);
    }
    return user;
}