import React from "react";
import CheckBox from "../../components/CheckBox";
import "./style.css";

const MultipleChoiceQuestion = ({ question, value, onChangeHandler }) => {

    const getMultipleChoices = question => {
        const options = question["options"];
        const sortedOptions = sortOptionsById(options);
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

    const sortOptionsById = options => {
        const sortedOptions = [...options];
        sortedOptions.sort((o1, o2) => {
            return o1["id"] > o2["id"] ? 1 : -1;
        });
        return sortedOptions;
    };

    return (
        <div className="multiple-choice-question">
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
