import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "../pages/LoginPage/index";
import Dashboard from "../pages/Dashboard/index";
import NewClient from "../pages/NewClient";
import ExampleComponent from "../components/ExampleComponent";

const Router = () => {
    return (
        <div className="Router">
            <Switch>
                <Route path="/loginpage" exact component={LoginPage} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/new-client" exact component={NewClient} />
                <Route path="/example" exact component={ExampleComponent} />
                <Redirect to="/loginpage" />
            </Switch>
        </div>
    );
};

export default Router;
