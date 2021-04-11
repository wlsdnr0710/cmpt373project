import React from "react";
import { doAuthentication } from "../../utils/AuthenticationUtil";
import BackgroundCard from "../../components/BackgroundCard";
import NewRiskUpdateForm from "../../containers/NewRiskUpdateForm";
import "./style.css";

const NewRiskUpdate = ({ history, location }) => {
    doAuthentication(history);

    return (
        <div className="new-risk-update">
            <BackgroundCard heading="New Risk Update">
                <NewRiskUpdateForm clientID={location.state.clientID} />
            </BackgroundCard>
        </div>
    );
};

export default NewRiskUpdate;
