import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ViewClient from "../pages/ViewClient";
import ExampleComponent from "../components/ExampleComponent";

const Router = () => {
    return (
        <div className="Router">
            <Switch>
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/view-client" exact component={ViewClient} />
                <Route path="/example" exact component={ExampleComponent} />
                <Redirect to="/dashboard" />
            </Switch>
        </div>
    );
};

export default Router;
