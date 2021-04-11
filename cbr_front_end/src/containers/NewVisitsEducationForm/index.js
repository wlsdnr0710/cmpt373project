import React from "react";
import DropdownList from "../../components/DropdownList";
import TextAreaInputField from "../../components/TextAreaInputField";
import CheckBox from "../../components/CheckBox";
import "./style.css";

const NewVisitsEducationForm = ({
    referralToEducationOrgValue,
    referralToEducationOrgDescValue,
    educationServiceOptions,
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

    const createServiceOptionCheckBoxComponents = () => {
        const serviceOptionCheckboxComponents = [];
        console.log(educationServiceOptions);
        const serviceOptions = educationServiceOptions;
        if(serviceOptions === undefined || serviceOptions.length === 0) {
            return null;
        }
        else {
            for (const index in serviceOptions) {
                const name = serviceOptions[index].name;
                const id = serviceOptions[index].id;
                serviceOptionCheckboxComponents.push(<CheckBox
                                                        name={name}
                                                        value={id}
                                                        actionHandler={actionHandler}
                                                        displayText={name}
                                                        key={index}
                                                />
                                                );
            }
            return serviceOptionCheckboxComponents;
        }
    };

    return (
        <div className="new-client-survey">
            <div className="section">
                <label>For Education: What was provided?</label>
                {createServiceOptionCheckBoxComponents()}
                <div>
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
                </div>
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
