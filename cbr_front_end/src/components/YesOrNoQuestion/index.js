import React from "react";
import CheckBox from "../../components/CheckBox";
import "./style.css";

const YesOrNoQuestion = ({ question, value, onChangeHandler }) => {
    return (
        <div className="yes-or-no-question">
            <div className="question-name">
                {question["name"]}
            </div>
            <div className="question-answer">
                <CheckBox
                    name="yes"
                    value={value}
                    actionHandler={onChangeHandler}
                    displayText={"Yes"}
                />
            </div>
        </div>
    );
};

export default YesOrNoQuestion;
