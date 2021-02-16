import React from "react";
import DropdownList from "../../components/DropdownList";
import TextAreaInputField from "../../components/TextAreaInputField";
import CheckBox from "../../components/CheckBox";
import "./style.css";

const NewVisitsSocialForm = ({

    referralToSocialOrgName,
    referralToSocialOrgValue,
    referralToSocialOrgNameDescName,
    referralToSocialOrgNameDescValue,
    socialAdviceName,
    socialAdviceValue,
    socialAdviceDescName,
    socialAdviceDescValue,
    socialAdvocacyName,
    socialAdvocacyValue,
    socialAdvocacyDescName,
    socialAdvocacyDescValue,
    socialEncouragementName,
    socialEncouragementValue,
    socialEncouragementDescName,
    socialEncouragementDescValue,

    socialGoalConclusionTextName,
    socialGoalConclusionTextValue,
    socialGoalMetName,
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
                <div>

                    <CheckBox
                        name={referralToSocialOrgName}
                        value={referralToSocialOrgValue}
                        actionHandler={actionHandler}
                        displayText={"Referral to Social Organization"}
                    />

                    <div hidden={!referralToSocialOrgValue}>
                        <TextAreaInputField
                            name={referralToSocialOrgNameDescName}
                            value={referralToSocialOrgNameDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name={socialAdviceName}
                        value={socialAdviceValue}
                        actionHandler={actionHandler}
                        displayText={"Social Advice"}
                    />
                    <div hidden={!socialAdviceValue}>
                        <TextAreaInputField
                            name={socialAdviceDescName}
                            value={socialAdviceDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name={socialAdvocacyName}
                        value={socialAdvocacyValue}
                        actionHandler={actionHandler}
                        displayText={"Social Advocacy"}
                    />
                    <div hidden={!socialAdvocacyValue}>
                        <TextAreaInputField
                            name={socialAdvocacyDescName}
                            value={socialAdvocacyDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name={socialEncouragementName}
                        value={socialEncouragementValue}
                        actionHandler={actionHandler}
                        displayText={"Social Encouragement"}
                    />
                    <div hidden={!socialEncouragementValue}>
                        <TextAreaInputField
                            name={socialEncouragementDescName}
                            value={socialEncouragementDescValue}
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
                        dropdownName={socialGoalMetName}
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
                            name={socialGoalConclusionTextName}
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
