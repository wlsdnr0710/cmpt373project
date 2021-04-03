import jwt_decode from "jwt-decode";

export const isAuthenticated = () => {
    const token = getToken();
    if (!token) {
        return false;
    }
    if (isTokenExpired(token)) {
        removeToken();
        removeRole();
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

export const checkForAdmin = history => {
    if (getRole() !== "ADMIN") {
        history.push("dashboard");
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

export const removeToken = () => {
    window.localStorage.removeItem("token");
};

export const saveRole = role => {
    window.sessionStorage.setItem("role", role);
};

export const getRole = () => {
    return window.sessionStorage.getItem("role");
};

export const removeRole = () => {
    window.sessionStorage.removeItem("role");
};
