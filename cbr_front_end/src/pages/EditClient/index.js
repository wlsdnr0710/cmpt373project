import React from "react";
import { doAuthentication } from "../../utils/AuthenticationUtil";
import BackgroundCard from "../../components/BackgroundCard";
import EditClientForm from "../../containers/EditClientForm";
import "./style.css";

const EditClient = ({ history, location }) => {
    doAuthentication(history);
    return (
        <div>
            <BackgroundCard heading="Edit Client">
                <EditClientForm clientID={location.state.clientID}/>
            </BackgroundCard>
        </div>
    );
};

export default EditClient;
