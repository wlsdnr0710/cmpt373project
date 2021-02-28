import React from "react";
import { doAuthentication } from "../../utils/AuthenticationUtil";
import NewClientForm from "../../containers/NewClientForm";

const NewClient = props => {
    doAuthentication(props.history);
    return (
        <div className="">
            <NewClientForm />
        </div>
    );
};

export default NewClient;
