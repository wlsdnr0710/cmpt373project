import React from "react";
import { Link } from "react-router-dom";

const ExampleComponent = props => {
    return (
        <div className="example-component">
            <p>CBR Manager - Group Earth</p>
            <p>This is an example of functional component.</p>
            <Link to="/dashboard">
                Go back to Dashboard.
            </Link>
        </div>
    );
};

export default ExampleComponent;
