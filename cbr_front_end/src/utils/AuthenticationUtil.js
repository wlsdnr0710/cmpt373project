import jwt_decode from "jwt-decode";

export const isAuthenticated = () => {
    const token = window.localStorage.getItem("token");
    if (!token) {
        return false;
    }
    if (isTokenExpired(token)) {
        window.localStorage.removeItem("token");
        return false;
    }
    return true;
};

export const doAuthentication = history => {
    if (!isAuthenticated()) {
        history.push("user-login");
        return false;
    }
    return true;
};

const isTokenExpired = token => {
    const decodedToken = jwt_decode(token);
    const expiredTime = decodedToken.exp;
    const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
    if (currentTimeInSeconds > expiredTime) {
        return true;
    } else {
        return false;
    }
};

export const getWorkerIdFromToken = token => {
    const decodedToken = jwt_decode(token);
    const id = parseInt(decodedToken.aud[0]);
    return id;
};

export const getWorkerUsernameFromToken = token => {
    const decodedToken = jwt_decode(token);
    const username = decodedToken.aud[1];
    return username;
};

export const saveToken = token => {
    window.localStorage.setItem("token", token);
};

export const getToken = () => {
    return window.localStorage.getItem("token");
};

export const saveRole = role => {
    window.localStorage.setItem("role", role);
};

export const getRole = () => {
    return window.localStorage.getItem("role");
};

export const removeToken = () => {
    window.localStorage.removeItem("token");
};
