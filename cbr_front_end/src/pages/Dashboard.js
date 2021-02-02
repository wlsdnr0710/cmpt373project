import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <p>This is Dashboard page.</p>

            <ul>
                <li>
                    <Link to="/example">
                    Click this link to jump to ExampleComponent.
                    </Link>
                </li>
                <li>
                    <Link to="/clientPage">
                    To Client information page
                    </Link>
                </li>
            </ul>
            
            <p>
                Note that the browser does not refresh the page, but JavaScript re-renders the page. 
                This makes the web looks like an app.
            </p>
        </div>
    );
};

export default Dashboard;
