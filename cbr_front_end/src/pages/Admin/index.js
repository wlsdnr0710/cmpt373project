import React from 'react';
import { doAuthentication } from "../../utils/AuthenticationUtil";
import "./style.css";

const Admin = ({ history }) => {
    doAuthentication(history);
    return (
        <div>
            <p>Dashboard</p>
        </div>
    );
};

export default Admin;