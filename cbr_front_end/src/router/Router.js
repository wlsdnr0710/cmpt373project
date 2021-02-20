import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ViewClient from "../pages/ViewClient";
import NewClient from "../pages/NewClient";
import NewVisit from "../pages/NewVisit";
import ClientInformation from "../pages/ClientInformation";
import EditClient from "../pages/EditClient";

const Router = () => {
    return (
        <div className="Router">
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/view-client" exact component={ViewClient} />
                <Route path="/new-client" exact component={NewClient} />
                <Route path="/new-visit" exact component={NewVisit} />
                <Route path="/client-information" exact component={ClientInformation} />
                <Route path="/edit-client" exact component={EditClient} />
                <Redirect to="/login" />
            </Switch>
        </div>
    );
};

export default Router;
