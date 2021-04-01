import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import DropdownList from "../../components/DropdownList";
import { getToken } from "../../utils/AuthenticationUtil";
import { getAllSurveys } from "../../utils/Utilities";
import { getDefaultSurveyQuestionTypes } from "../../utils/Utilities";
import Survey from "../../containers/Survey";
import "./style.css";

const AnswerSurveyForm = () => {
    const [surveys, setSurveys] = useState([]);
    const [selectedSurveyId, setSelectedSurveyId] = useState("");
    const [surveyInput, setSurveyInput] = useState();

    const surveyQuestionType = getDefaultSurveyQuestionTypes();

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
            setSelectedSurveyId(firstSurveyId);
            setDefaultSurveyInputBySurveySurvey(surveys[firstSurveyKey]);
        };

        // Important: We do not set default input by ID because
        // setSelectedSurveyId() is asynchronous.
        // Therefore, surveys are null at this point.
        const setDefaultSurveyInputBySurveySurvey = survey => {
            const questions = survey["questions"];
            const input = {};
            for (let i = 0; i < questions.length; i++) {
                const question = questions[i];
                input[question["id"]] = {
                    "name": question["name"],
                    "value": getSurveyInputDefaultValue(question)
                };
            }
            setSurveyInput(input);
        };

        getSurveyList();
    }, []);

    const setDefaultSurveyInputBySurveyId = id => {
        const survey = getSurveyByIdFromState(id);
        if (survey === null) {
            return;
        }
        const questions = survey["questions"];
        const input = {};
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            input[question["id"]] = {
                "name": question["name"],
                "value": getSurveyInputDefaultValue(question)
            };
        }
        setSurveyInput(input);
    };

    const getSurveyInputDefaultValue = question => {
        if (question["type"] === surveyQuestionType["Yes or No"]) {
            return false;
        } else if (question["type"] === surveyQuestionType["Multiple Choice"]) {
            return [];
        } else {
            return "";
        }
    };

    const getSurveyByIdFromState = id => {
        let targetSurvey = null;
        for (const key in surveys) {
            const survey = surveys[key];
            if (survey["id"] === id) {
                targetSurvey = survey;
            }
        }
        return targetSurvey;
    };

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
        const id = dropdown.value;
        setSelectedSurveyId(id);
        setDefaultSurveyInputBySurveyId(parseInt(id));
    };

    const showSurvey = () => {
        const survey = getSurveyByIdFromState(parseInt(selectedSurveyId));
        // Must wait until all states are set up to render Survey.
        if (survey === null || surveyInput === undefined) {
            return null;
        }
        return (
            <Survey
                survey={survey}
                values={surveyInput}
                setter={setSurveyInput}
            />
        );
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
                    value={selectedSurveyId}
                    onChange={onChangeSurveyDropdown}
                />
            </div>
            <div className="display-survey">
                {showSurvey()}
            </div>
            <div>
                <hr />
                <Button
                    variant="primary"
                    size="sm"
                    disabled={false}
                    onClick={() => { console.log(surveyInput) }}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default AnswerSurveyForm;
