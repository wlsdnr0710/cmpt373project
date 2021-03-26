import React from "react";
import { doAuthentication } from "../../utils/AuthenticationUtil";
import AnswerSurveyForm from "../../containers/AnswerSurveyForm";
import "./style.css";

const AnswerSurvey = () => {
    doAuthentication();

    return (
        <div className="answer-survey">
            <AnswerSurveyForm />
        </div>
    );
};

export default AnswerSurvey;
