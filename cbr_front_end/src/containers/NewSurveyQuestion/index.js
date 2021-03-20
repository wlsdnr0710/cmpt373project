import React from "react";
import Button from 'react-bootstrap/Button';
import CheckBox from "../../components/CheckBox";
import DropdownList from "../../components/DropdownList";
import TextInputField from "../../components/TextInputField";
import "./style.css";

const NewSurveyQuestion = (
    {
        getUpdateOptionsHandler,
        updateQuestionHandler,
        values,
        numOptions,
        onChangeQuestionType,
        onClickMoreOption,
        onChangeIsRequired,
        onDeleteHandler,
    }) => {
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
                        value={values["options"][i]}
                        onChange={getUpdateOptionsHandler(i)}
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
                        value={values["isQuestionRequired"]}
                        actionHandler={onChangeIsRequired}
                        displayText={"Required?"}
                    />
                </div>
                <div>
                    <Button
                        variant="danger"
                        size="sm"
                        disabled={false}
                        onClick={onDeleteHandler}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        );
    };

    const defaultSurveyQuestionTypes = {
        "Multiple Choice": "multipleChoice",
        "Yes or No": "yesOrNo",
        "Dropdown": "dropdown",
    };

    return (
        <div className="new-survey-question">
            <div className="input-field-container">
                <div className="label">
                    <label>Question:</label>
                </div>
                <TextInputField
                    name="question"
                    value={values["question"]}
                    onChange={updateQuestionHandler}
                    isDisabled={false}
                />
            </div>

            <div className="input-field-container">
                <div className="label">
                    <label>Question type:</label>
                </div>
                <DropdownList
                    dropdownName="question_type"
                    value={values["question_type"]}
                    dropdownListItemsKeyValue={defaultSurveyQuestionTypes}
                    onChange={onChangeQuestionType}
                    isDisabled={false}
                />
            </div>

            {getOptionInputFields()}

            <div className="more-option-button-container">
                <Button
                    variant="info"
                    size="sm"
                    disabled={false}
                    onClick={onClickMoreOption}
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
