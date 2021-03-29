import React from "react";
import { doAuthentication } from "../../utils/AuthenticationUtil";
import FormHeader from "../../components/FormHeader";
import AlertMessageBoard from "../../containers/AlertMessageBoard";
import PriorityClientList from "../../containers/PriorityClientList";
import OutstandingReferralsList from "../../containers/OutstandingReferralsList";

const DashBoard = ({ history }) => {
    doAuthentication(history);
    return (
        <div className="dashboard">
            <FormHeader 
                headerText="Dashboard"
            />
            <AlertMessageBoard />

            <hr />

            <PriorityClientList />

            <hr />

            <OutstandingReferralsList />
        </div>
    );
};

export default DashBoard;
