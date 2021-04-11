import React from "react";
import DropdownList from "../../components/DropdownList";
import TextAreaInputField from "../../components/TextAreaInputField";
import CheckBox from "../../components/CheckBox";
import "./style.css";

const NewVisitsSocialForm = ({
    socialServiceOptions,
    createServiceOptionComponents,
    socialGoalConclusionTextValue,
    socialGoalMetValue,
    isSocialGoalConcluded,
    actionHandler,
    onChange,
    goalInputs,
}) => {
    return (
        <div className="new-client-survey">
            <div className="section">
                <label>For Social: What was provided?</label>
                {createServiceOptionComponents(socialServiceOptions, actionHandler, onChange)}
                <div >
                    <div>
                        <label>Goal met? :</label>
                    </div>
                    <DropdownList
                        dropdownName="socialGoalProgress"
                        value={socialGoalMetValue}
                        dropdownListItemsKeyValue={goalInputs}
                        onChange={onChange}
                        isDisabled={false}
                    />
                </div>
                <div hidden={!isSocialGoalConcluded}>
                    <div>
                        <label>What was the outcome?</label>
                    </div>
                    <div >
                        <TextAreaInputField
                            name="socialOutcome"
                            value={socialGoalConclusionTextValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewVisitsSocialForm;
