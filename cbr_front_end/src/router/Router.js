import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ExampleComponent from "../components/ExampleComponent";
import ClientInfo from "../pages/ClientInfo";

const Router = () => {
    return (
        <div className="Router">
            <Switch>
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/example" exact component={ExampleComponent} />
                <Route path="/clientPage" exact component={ClientInfo} />
                <Redirect to="/dashboard" />
            </Switch>
        </div>
    );
};

export default Router;
