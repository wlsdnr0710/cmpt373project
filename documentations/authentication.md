# Authentication at Front-End Side

## Authentication Module

There is an authentication module at src/utils/AuthenticationUtil.js. Developers can use this module to check whether a user is authenticated. Also, the authentication module provides methods to save or remove the authentication token.

## Send Requests with Authentication Token

If a request requires the user to be authenticated, we need to send the request with the authenticated token together. We need to attach the authentication token to the request headers and give it a name called "token". We can use the getToken() method from the module to get the authenticated token. For example,

```js
const requestHeader = {
    token: getToken()
};
axios.get(
        ServerConfig.api.url + "/api/v1/client/pageNumber/" + page + "/pageSize/" + clientsPerPage, 
        {
            headers: requestHeader,
        }
    )
```

## Authenticating Users in Pages

If a page requires authentication, developers should call the method doAuthentication() at the first line of their page component and pass a history object to the method. doAuthentication() will use the history object to redirect the user to the login page if the user is not authenticated.

```js
const DashBoard = ({ history }) => {
    doAuthentication(history);
    // ...
}
```

## User Sign Out

When we want to sign out the user, we just need to remove their authentication token. We can use the removeToken() method from the authentication module.

```js
removeToken();
```

## User Sign In

If we want to sign a user in, we need to save the authentication token sent from the server. We can use the method saveToken() from the authentication module.

```js
saveToken();
```
