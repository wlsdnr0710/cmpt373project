import React from "react";
import DropdownList from "../../components/DropdownList";
import TextAreaInputField from "../../components/TextAreaInputField";
import CheckBox from "../../components/CheckBox";
import "./style.css";

const NewVisitsEducationForm = ({
    referralToEducationOrgName,
    referralToEducationOrgValue,
    referralToEducationOrgNameDescName,
    referralToEducationOrgNameDescValue,
    educationAdviceName,
    educationAdviceValue,
    educationAdviceDescName,
    educationAdviceDescValue,
    educationAdvocacyName,
    educationAdvocacyValue,
    educationAdvocacyDescName,
    educationAdvocacyDescValue,
    educationEncouragementName,
    educationEncouragementValue,
    educationEncouragementDescName,
    educationEncouragementDescValue,
    educationGoalConclusionTextName,
    educationGoalConclusionTextValue,
    educationGoalMetName,
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
                <div>
                    <CheckBox
                        name={referralToEducationOrgName}
                        value={referralToEducationOrgValue}
                        actionHandler={actionHandler}
                        displayText={"Referral to Education Organization"}
                    />

                    <div hidden={!referralToEducationOrgValue}>
                        <TextAreaInputField
                            name={referralToEducationOrgNameDescName}
                            value={referralToEducationOrgNameDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name={educationAdviceName}
                        value={educationAdviceValue}
                        actionHandler={actionHandler}
                        displayText={"Education Advice"}
                    />
                    <div hidden={!educationAdviceValue}>
                        <TextAreaInputField
                            name={educationAdviceDescName}
                            value={educationAdviceDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name={educationAdvocacyName}
                        value={educationAdvocacyValue}
                        actionHandler={actionHandler}
                        displayText={"Education Advocacy"}
                    />
                    <div hidden={!educationAdvocacyValue}>
                        <TextAreaInputField
                            name={educationAdvocacyDescName}
                            value={educationAdvocacyDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name={educationEncouragementName}
                        value={educationEncouragementValue}
                        actionHandler={actionHandler}
                        displayText={"Education Encouragement"}
                    />
                    <div hidden={!educationEncouragementValue}>
                        <TextAreaInputField
                            name={educationEncouragementDescName}
                            value={educationEncouragementDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div >
                    <div>
                        <label>Goal met?:</label>
                    </div>
                    <DropdownList
                        dropdownName={educationGoalMetName}
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
                            name={educationGoalConclusionTextName}
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
