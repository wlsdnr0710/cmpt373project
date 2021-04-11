import React from "react";
import DropdownList from "../../components/DropdownList";
import TextAreaInputField from "../../components/TextAreaInputField";
import CheckBox from "../../components/CheckBox";
import "./style.css";

const NewVisitsEducationForm = ({
    referralToEducationOrgValue,
    referralToEducationOrgDescValue,
    educationServiceOptions,
    createServiceOptionComponents,
    educationAdviceValue,
    educationAdviceDescValue,
    educationAdvocacyValue,
    educationAdvocacyDescValue,
    educationEncouragementValue,
    educationEncouragementDescValue,
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
                {/* <div>
                    <CheckBox
                        name="referralToEducationOrg"
                        value={referralToEducationOrgValue}
                        actionHandler={actionHandler}
                        displayText={"Referral to Education Organization"}
                    />

                    <div hidden={!referralToEducationOrgValue}>
                        <TextAreaInputField
                            name="referralToEducationOrgDesc"
                            value={referralToEducationOrgDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name="educationAdvice"
                        value={educationAdviceValue}
                        actionHandler={actionHandler}
                        displayText={"Education Advice"}
                    />
                    <div hidden={!educationAdviceValue}>
                        <TextAreaInputField
                            name="educationAdviceDesc"
                            value={educationAdviceDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name="educationAdvocacy"
                        value={educationAdvocacyValue}
                        actionHandler={actionHandler}
                        displayText={"Education Advocacy"}
                    />
                    <div hidden={!educationAdvocacyValue}>
                        <TextAreaInputField
                            name="educationAdvocacyDesc"
                            value={educationAdvocacyDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name="educationEncouragement"
                        value={educationEncouragementValue}
                        actionHandler={actionHandler}
                        displayText={"Education Encouragement"}
                    />
                    <div hidden={!educationEncouragementValue}>
                        <TextAreaInputField
                            name="educationEncouragementDesc"
                            value={educationEncouragementDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div> */}
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
