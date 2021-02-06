import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "../pages/LoginPage/index";
import ExampleComponent from "../components/ExampleComponent";

const Router = () => {
    return (
        <div className="Router">
            <Switch>
                <Route path="/loginpage" exact component={LoginPage} />
                <Redirect to="/loginpage" />
            </Switch>
        </div>
    );
};

export default Router;
