import React, { useState } from "react";
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
                <div key={i}>
                    <div className="label-container">
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
                    <button>Delete</button>
                </div>
            </div>
        );
    };

    const onClickMoreOption = event => {
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
            <div className="">
                <label>Question:</label>
            </div>
            <TextInputField
                name="question"
                value={formInputs["question"]}
                onChange={() => { }}
                isDisabled={false}
            />

            <div className="">
                <label>Question type:</label>
            </div>
            <DropdownList
                dropdownName="question_type"
                value={formInputs["question_type"]}
                dropdownListItemsKeyValue={defaultSurveyQuestionTypes}
                onChange={() => { }}
                isDisabled={false}
            />

            {getOptionInputFields()}

            <div>
                <button onClick={onClickMoreOption}>More Option</button>
            </div>

            <hr />

            <div>
                {showActionFooter()}
            </div>
        </div>
    );
};

export default NewSurveyQuestion;
