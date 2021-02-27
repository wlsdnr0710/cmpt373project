import React from "react";
import { doAuthentication } from "../../utils/AuthenticationUtil";
import NewClientForm from "../../containers/NewClientForm";

const NewClient = props => {
    doAuthentication();
    return (
        <div className="">
            <NewClientForm />
        </div>
    );
};

export default NewClient;
