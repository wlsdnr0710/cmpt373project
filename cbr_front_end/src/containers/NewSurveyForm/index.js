import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import FormHeader from "../../components/FormHeader";
import NewSurveyQuestion from "../NewSurveyQuestion";
import TextInputField from "../../components/TextInputField";
import { getDefaultNewSurveyObject, updateFormInputByNameAndSetter } from "../../utils/Utilities";
import "./style.css";

const NewSurveyForm = () => {
    const [formInputs, setFormInputs] = useState(getDefaultNewSurveyObject());
    const [numQuestions, setNumQuestions] = useState(1);

    const showSurveyQuestionInputFields = () => {
        const surveyQuestionsArray = [];
        for (let i = 0; i < numQuestions; i++) {
            surveyQuestionsArray.push(
                <NewSurveyQuestion key={i} />
            );
        }
        return surveyQuestionsArray;
    };

    const onClickMoreQuestion = () => {
        setNumQuestions(oldNum => oldNum + 1);
    };

    return (
        <div className="new-survey-form">
            <FormHeader
                headerText="Create new survey questions"
            />

            <div className="input-field-container">
                <div className="label-container">
                    <label>Survey Name:</label>
                </div>
                <TextInputField
                    name="name"
                    value={formInputs["name"]}
                    onChange={updateFormInputByNameAndSetter("name", setFormInputs)}
                    isDisabled={false}
                />
            </div>

            <div>
                {showSurveyQuestionInputFields()}
            </div>

            <div className="more-questions-button-container">
                <Button
                    variant="primary"
                    size="sm"
                    disabled={false}
                    onClick={onClickMoreQuestion}
                >
                    More Questions
                </Button>
            </div>
        </div>
    );
};

export default NewSurveyForm;
