# CBR Manager - Group Earth

## Set up environment

Please npm install all dependencies for the first time you run the front-end code.

```
cd cbr_front_end
npm install
```

## Run front-end code

If you want to run front-end code on your local server, run:

```
cd cbr_front_end
npm start
```

## How to use React Router

If you want to add a new page to front-end code, please follow these steps to use React Router.

### Step 1: create your page component

```js
import React from "react";

const MyPage = props => {
    return (
        <div className="my-page">
            This is my page.
        </div>
    );
};

export default MyPage;
```

### Step 2: add a route to your page component

src/router/Router.js

```js
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MyPage from "../pages/MyPage";    // Import your component

const Router = () => {
    return (
        <div className="Router">
            <Switch>
                {/* Add a Route here */}
                <Route path="/mypage" exact component={MyPage} />  
 
                <Redirect to="/dashboard" />
            </Switch>
        </div>
    );
};

export default Router;

```

### Step 3: use a Link component to link to your page component

```js
import React from "react";
import { Link } from "react-router-dom";

const OtherPage = props => {
    return (
        <div className="other-page">

            <Link to="/mypage">
                Click here to jump to MyPage
            </Link>

        </div>
    );
};

export default OtherPage;

```
