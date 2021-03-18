import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import CheckBox from "../../components/CheckBox";
import DropdownList from "../../components/DropdownList";
import TextInputField from "../../components/TextInputField";
import "./style.css";

const NewSurveyQuestion = () => {
    const [formInputs, setFormInputs] = useState({
        "question": "",
        "question_type": "multipleChoices"
    });
    const [numOptions, setNumOptions] = useState(1);

    const getOptionInputFields = () => {
        const numOptionsArray = [];
        for (let i = 0; i < numOptions; i++) {
            numOptionsArray.push(
                <div key={i} className="input-field-container">
                    <div className="label">
                        <label>Option {i + 1}:</label>
                    </div>
                    <TextInputField
                        name="question"
                        value={formInputs["question"]}
                        onChange={() => { }}
                        isDisabled={false}
                    />
                </div>
            );
        }
        return numOptionsArray;
    };

    const showActionFooter = () => {
        return (
            <div>
                <div>
                    <CheckBox
                        name="isQuestionRequired"
                        value={formInputs["isQuestionRequired"]}
                        actionHandler={() => { }}
                        displayText={"Required?"}
                    />
                </div>
                <div>
                    <Button
                        variant="danger"
                        size="sm"
                        disabled={false}
                        onClick={() => { }}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        );
    };

    const onClickMoreOptions = event => {
        event.preventDefault();
        setNumOptions(oldNum => oldNum + 1);
    };

    const defaultSurveyQuestionTypes = {
        "Multiple Choices": "multipleChoices",
        "Checkboxes": "checkBoxes",
        "Drop-down": "dropdown",
    };

    return (
        <div className="new-survey-question">
            <div className="input-field-container">
                <div className="label">
                    <label>Question:</label>
                </div>
                <TextInputField
                    name="question"
                    value={formInputs["question"]}
                    onChange={() => { }}
                    isDisabled={false}
                />
            </div>

            <div className="input-field-container">
                <div className="label">
                    <label>Question type:</label>
                </div>
                <DropdownList
                    dropdownName="question_type"
                    value={formInputs["question_type"]}
                    dropdownListItemsKeyValue={defaultSurveyQuestionTypes}
                    onChange={() => { }}
                    isDisabled={false}
                />
            </div>

            {getOptionInputFields()}

            <div>
                <Button
                    variant="info"
                    size="sm"
                    disabled={false}
                    onClick={onClickMoreOptions}
                >
                    More Options
                </Button>
            </div>

            <hr />

            <div>
                {showActionFooter()}
            </div>
        </div>
    );
};

export default NewSurveyQuestion;
