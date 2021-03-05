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
        history.push("/login");
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
    const { id } = parseInt(decodedToken.aud);
    return id;
};

export const getWorkerUsernameFromToken = token => {
    const decodedToken = jwt_decode(token);
    const { username } = decodedToken.aud;
    return username;
};

export const saveToken = token => {
    window.localStorage.setItem("token", token);
};

//TODO: saveUsername, and getUsername should be removed in the future due to redundancy.
//      Was added because getWorkerUsernameFromToken doesn't seem to work (returns undefined)
export const saveUsername = username => {
    window.localStorage.setItem("username", username);
};

export const getUsername = () =>{
    return window.localStorage.getItem("username");
}

export const getToken = () => {
    return window.localStorage.getItem("token");
};

export const removeToken = () => {
    window.localStorage.removeItem("token");
};
