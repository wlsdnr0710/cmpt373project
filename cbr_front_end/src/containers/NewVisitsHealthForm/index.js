import React from "react";
import DropdownList from "../../components/DropdownList";
import TextAreaInputField from "../../components/TextAreaInputField";
import CheckBox from "../../components/CheckBox";
import "./style.css";

const NewVisitsHealthForm = ({
    healthServiceOptions,
    createServiceOptionComponents,
    healthGoalConclusionTextValue,
    healthGoalMetValue,
    isHealthGoalConcluded,
    actionHandler,
    onChange,
    descriptionHandler,
    goalInputs,
}) => {
    return (
        <div className="new-client-survey">
            <div className="section">
                <label>For Health: What was provided?</label>
                {createServiceOptionComponents(healthServiceOptions, actionHandler, descriptionHandler)}
                <div >
                    <div>
                        <label>Goal met? :</label>
                    </div>
                    <DropdownList
                        dropdownName="healthGoalProgress"
                        value={healthGoalMetValue}
                        dropdownListItemsKeyValue={goalInputs}
                        onChange={onChange}
                        isDisabled={false}
                    />
                </div>
                <div hidden={!isHealthGoalConcluded}>
                    <div>
                        <label>What was the outcome?</label>
                    </div>
                    <div >
                        <TextAreaInputField
                            name="healthOutcome"
                            value={healthGoalConclusionTextValue}
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

export default NewVisitsHealthForm;
