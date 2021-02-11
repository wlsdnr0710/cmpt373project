import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NewClient from "../pages/NewClient";
import NewVisit from "../pages/NewVisit";
import ExampleComponent from "../components/ExampleComponent";

const Router = () => {
    return (
        <div className="Router">
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/new-client" exact component={NewClient} />
                <Route path="/new-visit" exact component={NewVisit} />
                <Route path="/example" exact component={ExampleComponent} />
                <Redirect to="/new-visit" />
            </Switch>
        </div>
    );
};

export default Router;
