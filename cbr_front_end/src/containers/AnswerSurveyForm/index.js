import React, { useEffect, useState } from "react";
import DropdownList from "../../components/DropdownList";
import { getToken } from "../../utils/AuthenticationUtil";
import { getAllSurveys } from "../../utils/Utilities";
import "./style.css";

const AnswerSurveyForm = () => {
    const [surveys, setSurveys] = useState([]);

    useEffect(() => {
        const getSurveyList = () => {
            const requestHeader = {
                token: getToken()
            };
            getAllSurveys(requestHeader)
                .then(response => {
                    const responseSurveys = response.data.data;
                    setSurveys(responseSurveys);
                });
        };

        getSurveyList();
    }, []);

    return (
        <div className="answer-survey-form">

        </div>
    );
};

export default AnswerSurveyForm;
