import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import CheckBox from "../../components/CheckBox";
import DropdownList from "../../components/DropdownList";
import TextInputField from "../../components/TextInputField";
import { getDefaultSurveyQuestionObject, updateFormInputByNameAndSetter } from "../../utils/Utilities";
import "./style.css";

const NewSurveyQuestion = () => {
    const [formInputs, setFormInputs] = useState(getDefaultSurveyQuestionObject());
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
                        name="options"
                        value={formInputs["options"][i]}
                        onChange={getUpdateOptionsHandler(i)}
                        isDisabled={false}
                    />
                </div>
            );
        }
        return numOptionsArray;
    };

    const getUpdateOptionsHandler = key => {
        return event => {
            const option = event.target;
            const value = option.value;
            setFormInputs(oldFormInputs => {
                const options = oldFormInputs["options"];
                options[key] = value;
                oldFormInputs["options"] = options;
                return {...oldFormInputs};
            });
        };
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
                    onChange={updateFormInputByNameAndSetter("question", setFormInputs)}
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
                    onChange={updateFormInputByNameAndSetter("question_type", setFormInputs)}
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
