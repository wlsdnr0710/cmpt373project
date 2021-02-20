import React from "react";
import FormHeader from "../../components/FormHeader";
import AlertMessageBoard from "../../containers/AlertMessageBoard";
import PriorityClientList from "../../containers/PriorityClientList";

const DashBoard = () => {
    return (
        <div className="dashboard">
            <FormHeader 
                headerText="Dashboard"
            />
            <AlertMessageBoard />

            <PriorityClientList />
        </div>
    );
};

export default DashBoard;
