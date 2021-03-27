import React, { useEffect, useState } from "react";
import DropdownList from "../../components/DropdownList";
import { getToken } from "../../utils/AuthenticationUtil";
import { getAllSurveys } from "../../utils/Utilities";
import "./style.css";

const AnswerSurveyForm = () => {
    const [surveys, setSurveys] = useState([]);
    const [selectedSurvey, setSelectedSurvey] = useState("");

    useEffect(() => {
        const getSurveyList = () => {
            const requestHeader = {
                token: getToken()
            };
            getAllSurveys(requestHeader)
                .then(response => {
                    const responseSurveys = response.data.data;
                    setSurveys(responseSurveys);
                    setDefaultSelectedSurvey(responseSurveys);
                });
        };

        const setDefaultSelectedSurvey = surveys => {
            const keys = Object.keys(surveys);
            const firstSurveyKey = keys[0];
            const firstSurveyId = surveys[firstSurveyKey]["id"];
            setSelectedSurvey(firstSurveyId);
        };

        getSurveyList();
    }, []);

    const getSurveyIdsNamesForDropdownList = () => {
        const surveyNameIdMap = {};
        for (let i = 0; i < surveys.length; i++) {
            const survey = surveys[i];
            const id = survey["id"];
            const name = "[ID=" + id + "] " + survey["name"];
            surveyNameIdMap[name] = id;
        }
        return surveyNameIdMap;
    };

    const onChangeSurveyDropdown = event => {
        const dropdown = event.target;
        const value = dropdown.value;
        setSelectedSurvey(value);
    };

    return (
        <div className="answer-survey-form">
            <div className="select-survey-dropdown">
                <div>
                    Select a survey:
                </div>
                <DropdownList
                    dropdownName="selected-survey"
                    dropdownListItemsKeyValue={getSurveyIdsNamesForDropdownList()}
                    value={selectedSurvey}
                    onChange={onChangeSurveyDropdown}
                />
            </div>
        </div>
    );
};

export default AnswerSurveyForm;
