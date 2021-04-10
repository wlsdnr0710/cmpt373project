import React from "react";
import { doAuthentication } from "../../utils/AuthenticationUtil";
import NewRiskUpdateForm from "../../containers/NewRiskUpdateForm";
import "./style.css";

const NewRiskUpdate = ({ history, location }) => {
    doAuthentication(history);

    return (
        <div className="new-risk-update">
            <NewRiskUpdateForm clientID={location.state.clientID} />
        </div>
    );
};

export default NewRiskUpdate;
