import React from "react";
import TextAreaInputField from "../../components/TextAreaInputField";
import "./style.css";

const WrittenAnswer = ({ question, value, onChangeHandler }) => {

    return (
        <div className="written-answer question">
            <div className="question-name">
                {question["name"]}
            </div>
            <div className="question-answer">
                <TextAreaInputField
                    name="written-answer"
                    value={value}
                    onChange={onChangeHandler}
                />
            </div>
        </div>
    );
};

export default WrittenAnswer;
