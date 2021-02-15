import React from "react";
import FormHeader from "../../components/FormHeader";
import AlertMessageBoard from "../../containers/AlertMessageBoard";

const DashBoard = () => {
    return (
        <div className="dashboard">
            <FormHeader 
                headerText="Dashboard"
            />
            <AlertMessageBoard />
        </div>
    );
};

export default DashBoard;
