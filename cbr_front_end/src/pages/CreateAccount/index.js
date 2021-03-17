import React from 'react';
import CreateAccountForm from "../../containers/CreateAccountForm";
import ServerConfig from "../../config/ServerConfig";
import "./style.css";

const CreateAccount = () => {

    return (
        <div className="create-account">
            <CreateAccountForm />
        </div>
    );
};

export default CreateAccount;