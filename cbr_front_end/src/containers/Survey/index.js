import React from "react";
import { getDefaultSurveyQuestionTypes } from "../../utils/Utilities";
import YesOrNoQuestion from "../../components/YesOrNoQuestion";
import "./style.css";

const Survey = ({ survey }) => {
    if (survey === null) {
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

    const parseAndGetSurveyQuestion = question => {
        switch (question["type"]) {
            case surveyQuestionType["Yes or No"]:
                return <YesOrNoQuestion question={question} />
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
