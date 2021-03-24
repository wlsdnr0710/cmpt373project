import React from 'react';
import { doAuthentication } from "../../utils/AuthenticationUtil";
import ForgotPasswordForm from "../../containers/ForgotPasswordForm"
import "./style.css";
const ForgotPassword = ({ history }) => {
    doAuthentication(history);
    return (
        <div>
           <ForgotPasswordForm/>
        </div>
    );
}

export default ForgotPassword;