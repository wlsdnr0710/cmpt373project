import React from 'react';
import { doAuthentication } from "../../utils/AuthenticationUtil";
import HomeNavigation from "../../containers/HomeNavigation";
import "./style.css";

// TODO: Implement HomePage
const HomePage = ({ history }) => {
    doAuthentication(history);
    return (
        <div>
            <HomeNavigation />
        </div>
    );
};

export default HomePage;
