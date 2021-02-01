import React from 'react';
import { Link } from "react-router-dom";
const LoginPage = () => {
    return (
        <div className="loginpage">
            <p>This is Login Page page.</p>

            <p>
                Note that the browser does not refresh the page, but JavaScript re-renders the page.
                This makes the web looks like an app.
            </p>
        </div>
    );
};

export default LoginPage;