import React from "react";
import { Link } from "react-router-dom";
import FormHeader from "../../components/FormHeader";
import AlertMessageBoard from "../../containers/AlertMessageBoard"

const Dashboard = () => {
    return (
        <div className="dashboard">
            <FormHeader 
                headerText="Dashboard (temporary)"
            />
            <AlertMessageBoard />

            <Link to="/example">
                Click this link to jump to ExampleComponent.
            </Link>

            <p>
                Note that the browser does not refresh the page, but JavaScript re-renders the page.
                This makes the web looks like an app.
            </p>
        </div>
    );
};

export default Dashboard;
