import React from 'react';
import { doAuthentication } from "../../utils/AuthenticationUtil";
import "./style.css";

// TODO: Implement HomePage
const HomePage = ({ history }) => {
    doAuthentication(history);
    return (
        <div>
            <p>This is the temporary Home Page</p>
        </div>
    );
};

export default HomePage;
