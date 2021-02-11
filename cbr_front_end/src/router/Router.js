import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../pages/Login";
import NewClient from "../pages/NewClient";
import ExampleComponent from "../components/ExampleComponent";
import ClientInformation from "../pages/ClientInformation";

const Router = () => {
    return (
        <div className="Router">
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/new-client" exact component={NewClient} />
                <Route path="/example" exact component={ExampleComponent} />
                <Route path="/client-information" exact component={ClientInformation} />
                <Redirect to="/login" />
            </Switch>
        </div>
    );
};

export default Router;
