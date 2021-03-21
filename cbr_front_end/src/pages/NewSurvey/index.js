import React from "react";
import { doAuthentication } from "../../utils/AuthenticationUtil";
import NewSurveyForm from "../../containers/NewSurveyForm";
import "./style.css";

const NewSurvey = () => {
    // TODO: This page should open to admin only
    doAuthentication();

    return (
        <div className="new-survey">
            <NewSurveyForm />
        </div>
    );
};

export default NewSurvey;
