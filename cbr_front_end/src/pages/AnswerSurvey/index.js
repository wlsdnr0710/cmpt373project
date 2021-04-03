import React from "react";
import { doAuthentication } from "../../utils/AuthenticationUtil";
import AnswerSurveyForm from "../../containers/AnswerSurveyForm";
import "./style.css";

const AnswerSurvey = ({ history, location }) => {
    doAuthentication(history);

    return (
        <div className="answer-survey">
            <AnswerSurveyForm clientID={location.state.clientID} />
        </div>
    );
};

export default AnswerSurvey;
