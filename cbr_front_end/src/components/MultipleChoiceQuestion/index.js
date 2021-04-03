import React from "react";
import CheckBox from "../../components/CheckBox";
import { sortArrayByIdAscending } from "../../utils/Utilities";
import "./style.css";

const MultipleChoiceQuestion = ({ question, value, onChangeHandler }) => {

    const getMultipleChoices = question => {
        const options = question["options"];
        const sortedOptions = sortArrayByIdAscending(options);
        const choices = [];
        for (let i = 0; i < sortedOptions.length; i++) {
            const option = sortedOptions[i];
            choices.push(
                <div key={option["id"]}>
                    <div>
                        <CheckBox
                            name="multiple-choice"
                            value={value}
                            actionHandler={onChangeHandler(option)}
                            displayText={option["name"]}
                        />
                    </div>
                </div>
            );
        }
        return choices;
    };

    return (
        <div className="multiple-choice-question question">
            <div className="question-name">
                {question["name"]}
            </div>
            <div className="question-answer">
                {getMultipleChoices(question)}
            </div>
        </div>
    );
};

export default MultipleChoiceQuestion;
