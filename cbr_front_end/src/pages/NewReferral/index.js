import React from "react";
import { doAuthentication } from "../../utils/AuthenticationUtil";
import NewReferralForm from "../../containers/NewReferralForm";
import "./style.css";

const NewReferral = ({ history, location }) => {
    doAuthentication(history);

    return (
        <div className="new-referral">
            <NewReferralForm clientId={location.state.clientID} />
        </div>
    );
};

export default NewReferral;
