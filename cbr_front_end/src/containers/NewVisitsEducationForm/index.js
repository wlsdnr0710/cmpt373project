import React from "react";
import DropdownList from "../../components/DropdownList";
import TextAreaInputField from "../../components/TextAreaInputField";
import CheckBox from "../../components/CheckBox";
import "./style.css";

const NewVisitsEducationForm = ({
    educationServiceOptions,
    createServiceOptionComponents,
    educationGoalConclusionTextValue,
    educationGoalMetValue,
    isEducationGoalConcluded,
    actionHandler,
    onChange,
    goalInputs,
}) => {
    return (
        <div className="new-client-survey">
            <div className="section">
                <label>For Education: What was provided?</label>
                {createServiceOptionComponents(educationServiceOptions, actionHandler, onChange)}
                <div >
                    <div>
                        <label>Goal met? :</label>
                    </div>
                    <DropdownList
                        dropdownName="educationGoalProgress"
                        value={educationGoalMetValue}
                        dropdownListItemsKeyValue={goalInputs}
                        onChange={onChange}
                        isDisabled={false}
                    />
                </div>
                <div hidden={!isEducationGoalConcluded}>
                    <div>
                        <label>What was the outcome?</label>
                    </div>
                    <div >
                        <TextAreaInputField
                            name="educationOutcome"
                            value={educationGoalConclusionTextValue}
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

export default NewVisitsEducationForm;
