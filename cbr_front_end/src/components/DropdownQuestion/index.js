import React from "react";
import DropdownList from "../../components/DropdownList";
import "./style.css";

const DropdownQuestion = ({ question, value, onChangeHandler }) => {

    const getDropdownKeyValuePairs = question => {
        const options = question["options"];
        const sortedOptions = sortOptionsById(options);
        const dropdownKeyValuePairs = {};
        for (let i = 0; i < sortedOptions.length; i++) {
            const option = sortedOptions[i];
            dropdownKeyValuePairs[option["name"]] = option["id"];
        }
        return dropdownKeyValuePairs;
    };

    const sortOptionsById = options => {
        const sortedOptions = [...options];
        sortedOptions.sort((o1, o2) => {
            return o1["id"] > o2["id"] ? 1 : -1;
        });
        return sortedOptions;
    };

    return (
        <div className="dropdown-question">
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
