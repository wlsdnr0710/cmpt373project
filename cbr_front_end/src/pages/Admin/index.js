import React from 'react';
import { doAuthentication } from "../../utils/AuthenticationUtil";
import FormHeader from "../../components/FormHeader";
import Statistics from "../../containers/Statistics";
import WorkerList from "../../containers/WorkerList";
import SurveyAdmin from "../../containers/SurveyAdmin";
import "./style.css";

const Admin = ({ history }) => {
    doAuthentication(history);
    return (
        <div className="admin">
            <FormHeader
                headerText="Admin"
            />
            <Statistics />

            <hr />

            <WorkerList />

            <hr />

            <SurveyAdmin />
        </div>
    );
};

export default Admin;
