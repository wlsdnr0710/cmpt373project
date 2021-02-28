import React from "react";
import { doAuthentication } from "../../utils/AuthenticationUtil";
import FormHeader from "../../components/FormHeader";
import AlertMessageBoard from "../../containers/AlertMessageBoard";
import PriorityClientList from "../../containers/PriorityClientList";

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
        </div>
    );
};

export default DashBoard;
