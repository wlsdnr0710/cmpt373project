import React from "react";
import DropdownList from "../../components/DropdownList";
import TextAreaInputField from "../../components/TextAreaInputField";
import CheckBox from "../../components/CheckBox";
import "./style.css";

const NewVisitsHealthForm = ({
    wheelchairValue,
    wheelchairDescValue,
    prostheticValue,
    prostheticDescValue,
    orthoticValue,
    orthoticDescValue,
    wheelchairRepairsValue,
    wheelchairRepairsDescValue,
    referralToHealthCentreValue,
    referralToHealthCentreDescValue,
    healthAdviceValue,
    healthAdviceDescValue,
    healthAdvocacyValue,
    healthAdvocacyDescValue,
    healthEncouragementValue,
    healthEncouragementDescValue,
    healthGoalConclusionTextValue,
    healthGoalMetValue,
    isHealthGoalConcluded,
    actionHandler,
    onChange,
    goalInputs,
}) => {
    return (
        <div className="new-client-survey">
            <div className="section">
                <label>For Health: What was provided?</label>
                <div>
                    <CheckBox
                        name="wheelchair"
                        value={wheelchairValue}
                        actionHandler={actionHandler}
                        displayText={"Wheelchair"}
                    />
                    <div hidden={!wheelchairValue}>
                        <TextAreaInputField
                            name="wheelchairDesc"
                            value={wheelchairDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name="prosthetic"
                        value={prostheticValue}
                        actionHandler={actionHandler}
                        displayText={"Prosthetic"}
                    />
                    <div hidden={!prostheticValue}>
                        <TextAreaInputField
                            name="prostheticDesc"
                            value={prostheticDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name="orthotic"
                        value={orthoticValue}
                        actionHandler={actionHandler}
                        displayText={"Orthotic"}
                    />
                    <div hidden={!orthoticValue}>
                        <TextAreaInputField
                            name="orthoticDesc"
                            value={orthoticDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name="wheelchairRepairs"
                        value={wheelchairRepairsValue}
                        actionHandler={actionHandler}
                        displayText={"Wheelchair Repairs"}
                    />
                    <div hidden={!wheelchairRepairsValue}>
                        <TextAreaInputField
                            name="wheelchairRepairsDesc"
                            value={wheelchairRepairsDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name="referralToHealthCentre"
                        value={referralToHealthCentreValue}
                        actionHandler={actionHandler}
                        displayText={"Referral to Health Centre"}
                    />
                    <div hidden={!referralToHealthCentreValue}>
                        <TextAreaInputField
                            name="referralToHealthCentreDesc"
                            value={referralToHealthCentreDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name="healthAdvice"
                        value={healthAdviceValue}
                        actionHandler={actionHandler}
                        displayText={"Health Advice"}
                    />
                    <div hidden={!healthAdviceValue}>
                        <TextAreaInputField
                            name="healthAdviceDesc"
                            value={healthAdviceDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name="healthAdvocacy"
                        value={healthAdvocacyValue}
                        actionHandler={actionHandler}
                        displayText={"Health Advocacy"}
                    />
                    <div hidden={!healthAdvocacyValue} >
                        <TextAreaInputField
                            name="healthAdvocacyDesc"
                            value={healthAdvocacyDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name="healthEncouragement"
                        value={healthEncouragementValue}
                        actionHandler={actionHandler}
                        displayText={"Health Encouragement"}
                    />
                    <div hidden={!healthEncouragementValue} >
                        <TextAreaInputField
                            name="healthEncouragementDesc"
                            value={healthEncouragementDescValue}
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
