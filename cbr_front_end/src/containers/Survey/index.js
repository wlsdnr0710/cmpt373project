import React from "react";
import { getDefaultSurveyQuestionTypes } from "../../utils/Utilities";
import DropdownQuestion from "../../components/DropdownQuestion";
import MultipleChoiceQuestion from "../../components/MultipleChoiceQuestion";
import WrittenAnswer from "../../components/WrittenAnswer";
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
        const sortedQuestions = sortQuestionsById(questions);
        const questionComponents = [];
        for (let i = 0; i < sortedQuestions.length; i++) {
            const question = sortedQuestions[i];
            const component = parseAndGetSurveyQuestion(question);
            questionComponents.push(component);
        }
        return questionComponents;
    };

    const sortQuestionsById = questions => {
        const sortedQuestions = [...questions];
        sortedQuestions.sort((q1, q2) => {
            return q1["id"] > q2["id"] ? 1 : -1;
        });
        return sortedQuestions;
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
            case surveyQuestionType["Multiple Choice"]:
                return (
                    <MultipleChoiceQuestion
                        key={question["id"]}
                        question={question}
                        value={values[question["id"]]["value"]}
                        onChangeHandler={getQuestionOnChangeHandler(question)}
                    />
                );
            case surveyQuestionType["Dropdown"]:
                return (
                    <DropdownQuestion
                        key={question["id"]}
                        question={question}
                        value={values[question["id"]]["value"]}
                        onChangeHandler={getQuestionOnChangeHandler(question)}
                    />
                );
            case surveyQuestionType["Written Answer"]:
                return (
                    <WrittenAnswer
                        key={question["id"]}
                        question={question}
                        value={values[question["id"]]["value"]}
                        onChangeHandler={getQuestionOnChangeHandler(question)}
                    />
                );
        }
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
        } else if (question["type"] === surveyQuestionType["Multiple Choice"]) {
            return option => {
                return event => {
                    const isChecked = event.target.checked;
                    if (isChecked) {
                        setter(prevState => {
                            const newState = { ...prevState };
                            const newQuestion = { ...newState[id] };
                            const newValue = [...newQuestion["value"]];
                            newValue.push(option);
                            newQuestion["value"] = newValue;
                            newState[id] = newQuestion;
                            return newState;
                        });
                    } else {
                        setter(prevState => {
                            const newState = { ...prevState };
                            const newQuestion = { ...newState[id] };
                            const newValue = [...newQuestion["value"]];
                            const removedOptionValue = removeOptionFromArray(newValue, option)
                            newQuestion["value"] = removedOptionValue;
                            newState[id] = newQuestion;
                            return newState;
                        });
                    }
                }
            }
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

    const removeOptionFromArray = (array, option) => {
        const afterRemovedArray = [...array];
        for (let i = 0; i < afterRemovedArray.length; i++) {
            const optionFromArray = afterRemovedArray[i];
            if (optionFromArray["id"] === option["id"]) {
                afterRemovedArray.splice(i, 1);
                break;
            }
        }
        return afterRemovedArray;
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
