import React from "react";
import DropdownList from "../../components/DropdownList";
import TextAreaInputField from "../../components/TextAreaInputField";
import CheckBox from "../../components/CheckBox";
import "./style.css";

const NewVisitsSocialForm = ({
    referralToSocialOrgValue,
    referralToSocialOrgDescValue,
    socialAdviceValue,
    socialAdviceDescValue,
    socialAdvocacyValue,
    socialAdvocacyDescValue,
    socialEncouragementValue,
    socialEncouragementDescValue,
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
                <div>
                    <CheckBox
                        name="referralToSocialOrg"
                        value={referralToSocialOrgValue}
                        actionHandler={actionHandler}
                        displayText={"Referral to Social Organization"}
                    />
                    <div hidden={!referralToSocialOrgValue}>
                        <TextAreaInputField
                            name="referralToSocialOrgDesc"
                            value={referralToSocialOrgDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name="socialAdvice"
                        value={socialAdviceValue}
                        actionHandler={actionHandler}
                        displayText={"Social Advice"}
                    />
                    <div hidden={!socialAdviceValue}>
                        <TextAreaInputField
                            name="socialAdviceDesc"
                            value={socialAdviceDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name="socialAdvocacy"
                        value={socialAdvocacyValue}
                        actionHandler={actionHandler}
                        displayText={"Social Advocacy"}
                    />
                    <div hidden={!socialAdvocacyValue}>
                        <TextAreaInputField
                            name="socialAdvocacyDesc"
                            value={socialAdvocacyDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name="socialEncouragement"
                        value={socialEncouragementValue}
                        actionHandler={actionHandler}
                        displayText={"Social Encouragement"}
                    />
                    <div hidden={!socialEncouragementValue}>
                        <TextAreaInputField
                            name="socialEncouragementDesc"
                            value={socialEncouragementDescValue}
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
