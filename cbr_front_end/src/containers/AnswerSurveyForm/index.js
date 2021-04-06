import React, { useEffect, useState } from "react";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import DropdownList from "../../components/DropdownList";
import { getToken } from "../../utils/AuthenticationUtil";
import { getAllSurveys, postAnsweredSurvey, sortArrayByIdAscending } from "../../utils/Utilities";
import { getDefaultSurveyQuestionTypes } from "../../utils/Utilities";
import Spinner from 'react-bootstrap/Spinner';
import Survey from "../../containers/Survey";
import "./style.css";

const AnswerSurveyForm = ({ clientID }) => {
    const [surveys, setSurveys] = useState([]);
    const [selectedSurveyId, setSelectedSurveyId] = useState("");
    const [surveyInput, setSurveyInput] = useState();
    const [isFormDisabled, setIsFormDisabled] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

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
        } else if (question["type"] === surveyQuestionType["Dropdown"]) {
            const sortedOptions = sortArrayByIdAscending(question["options"]);
            return sortedOptions[0]["id"];
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

    const onSubmitHandler = event => {
        event.preventDefault();
        setStatesDuringSubmitting();
        const data = {
            "surveyId": parseInt(selectedSurveyId),
            "surveyInputs": surveyInput,
            "clientId": clientID,
        }
        const requestHeader = {
            token: getToken()
        };
        postAnsweredSurvey(data, requestHeader)
            .then(response => {
                setStatesWhenSuccess();
            })
            .catch(error => {
                setStatesWhenFail();
                updateErrorMessages(error);
            })
    };

    const setStatesDuringSubmitting = () => {
        setIsSuccess(false);
        setErrorMessages([]);
        setIsFormDisabled(true);
        setIsSubmitting(true);
    };

    const setStatesWhenSuccess = () => {
        setIsSuccess(true);
        setIsFormDisabled(false);
        setIsSubmitting(false);
    };

    const setStatesWhenFail = () => {
        setIsFormDisabled(false);
        setIsSubmitting(false);
    };

    const updateErrorMessages = error => {
        setErrorMessages(prevErrorMessages => {
            let messages = ["Something went wrong on the server."];
            if (error.response) {
                messages = error.response.data.messages;
            }
            const newMessages = [...prevErrorMessages, ...messages];
            return newMessages;
        });
    };

    const showSuccessMessage = () => {
        if (!isSuccess) {
            return null;
        } else {
            return (
                <Alert variant="success">
                    The survey is successfully submitted!
                </Alert>
            );
        }
    };

    const showErrorMessages = () => {
        if (hasErrorMessages()) {
            const msgInDivs = packMessagesInDivs(errorMessages);
            return (
                <Alert variant="danger">
                    {msgInDivs}
                </Alert>
            );
        } else {
            return null;
        }
    };

    const hasErrorMessages = () => {
        return errorMessages.length !== 0;
    };

    const packMessagesInDivs = messages => {
        const msgInDivs = [];
        for (const idx in messages) {
            const msg = messages[idx];
            msgInDivs.push(
                <div key={idx}>
                    {msg}
                </div>
            );
        }
        return msgInDivs;
    };

    const getSubmitButtonText = () => {
        if (isSubmitting) {
            return (
                <div className="spinning-submit-button-text">
                    <Spinner
                        className="spinner"
                        as="div"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Submitting
                </div>
            );
        } else {
            return "Submit";
        }
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
                    disabled={isFormDisabled}
                    onClick={onSubmitHandler}
                >
                    {getSubmitButtonText()}
                </Button>
            </div>
            <div className="feedback-messages">
                {showSuccessMessage()}
                {showErrorMessages()}
            </div>
        </div>
    );
};

export default AnswerSurveyForm;
