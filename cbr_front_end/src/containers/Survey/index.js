import React from "react";
import { getDefaultSurveyQuestionTypes } from "../../utils/Utilities";
import YesOrNoQuestion from "../../components/YesOrNoQuestion";
import "./style.css";

const Survey = ({ survey, values, setter }) => {
    if (survey === null || values === undefined) {
        return null;
    }

    const surveyName = survey["name"];
    const surveyQuestionType = getDefaultSurveyQuestionTypes();

    const parseSurveyQuestions = () => {
        const questions = survey["questions"];
        const questionComponents = [];
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const component = parseAndGetSurveyQuestion(question);
            questionComponents.push(component);
        }
        return questionComponents;
    };

    const getQuestionOnChangeHandler = question => {
        const id = question["id"];
        if (question["type"] === surveyQuestionType["Yes or No"]) {
            return event => {
                const value = event.target.checked; 
                setter(prevState => {
                    const newState = { ...prevState };
                    const newQuestion = { ...newState[id] };
                    newQuestion["value"] = value;
                    newState[id] = newQuestion;
                    return newState;
                });
            };
        } else {
            return event => {
                const value = event.target.value;
                setter(prevState => {
                    const newState = { ...prevState };
                    const newQuestion = { ...newState[id] };
                    newQuestion["value"] = value;
                    newState[id] = newQuestion;
                    return newState;
                });
            };
        }

    };

    const parseAndGetSurveyQuestion = question => {
        switch (question["type"]) {
            case surveyQuestionType["Yes or No"]:
                return (
                    <YesOrNoQuestion
                        key={question["id"]}
                        question={question}
                        value={values[question["id"]]["value"]}
                        onChangeHandler={getQuestionOnChangeHandler(question)}
                    />
                );
        }
    };

    return (
        <div className="survey">
            <div className="survey-name">
                {surveyName}
            </div>
            <div className="survey-questions">
                {parseSurveyQuestions()}
            </div>
        </div>
    );
};

export default Survey;
