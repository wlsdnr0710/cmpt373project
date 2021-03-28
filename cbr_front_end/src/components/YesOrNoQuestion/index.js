import React from "react";
import "./style.css";

const YesOrNoQuestion = ({ question, onChangeHandler }) => {
    return (
        <div className="yes-or-no-question">
            <div className="question-name">
                {question["name"]}
            </div>
        </div>
    );
};

export default YesOrNoQuestion;
