import React from "react";
import DropdownList from "../../components/DropdownList";
import { sortArrayByIdAscending } from "../../utils/Utilities";
import "./style.css";

const DropdownQuestion = ({ question, value, onChangeHandler }) => {

    const getDropdownKeyValuePairs = question => {
        const options = question["options"];
        const sortedOptions = sortArrayByIdAscending(options);
        const dropdownKeyValuePairs = {};
        for (let i = 0; i < sortedOptions.length; i++) {
            const option = sortedOptions[i];
            dropdownKeyValuePairs[option["name"]] = option["id"];
        }
        return dropdownKeyValuePairs;
    };

    return (
        <div className="dropdown-question question">
            <div className="question-name">
                {question["name"]}
            </div>
            <div className="question-answer">
                <DropdownList
                    dropdownName="dropdown"
                    value={value}
                    dropdownListItemsKeyValue={getDropdownKeyValuePairs(question)}
                    onChange={onChangeHandler}
                />
            </div>
        </div>
    );
};

export default DropdownQuestion;
