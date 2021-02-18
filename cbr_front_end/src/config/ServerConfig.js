const getServerConfigByEnvironment = () => {
    const currentHost = window.location.hostname;
    let url;
    if (currentHost.indexOf("localhost") !== -1) {
        // development environment
        url = "http://localhost:8080";
    } else {
        // production environment
        url = "https://cmpt373-1211-03.cmpt.sfu.ca:8080";
    }
    return {
        api: {
            url: url
        }
    };
};

const ServerConfig = getServerConfigByEnvironment();

export default ServerConfig;
