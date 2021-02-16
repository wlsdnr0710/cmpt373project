import React from "react";
import DropdownList from "../../components/DropdownList";
import TextAreaInputField from "../../components/TextAreaInputField";
import CheckBox from "../../components/CheckBox";
import "./style.css";

const NewVisitsHealthForm = ({
    wheelchairName,
    wheelchairValue,
    wheelchairDescName,
    wheelchairDescValue,
    prostheticName,
    prostheticValue,
    prostheticDescName,
    prostheticDescValue,
    orthoticName,
    orthoticValue,
    orthoticDescName,
    orthoticDescValue,
    wheelchairRepairsName,
    wheelchairRepairsValue,
    wheelchairRepairsDescName,
    wheelchairRepairsDescValue,
    referralToHealthCentreName,
    referralToHealthCentreValue,
    referralToHealthDescCentreName,
    referralToHealthDescCentreValue,
    healthAdviceName,
    healthAdviceValue,
    healthAdviceDescName,
    healthAdviceDescValue,
    healthAdvocacyName,
    healthAdvocacyValue,
    healthAdvocacyDescName,
    healthAdvocacyDescValue,
    healthEncouragementName,
    healthEncouragementValue,
    healthEncouragementDescName,
    healthEncouragementDescValue,
    healthGoalConclusionTextName,
    healthGoalConclusionTextValue,
    healthGoalMetName,
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
                        name={wheelchairName}
                        value={wheelchairValue}
                        actionHandler={actionHandler}
                        displayText={"Wheelchair"}
                    />

                    <div hidden={!wheelchairValue}>
                        <TextAreaInputField
                            name={wheelchairDescName}
                            value={wheelchairDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name={prostheticName}
                        value={prostheticValue}
                        actionHandler={actionHandler}
                        displayText={"Prosthetic"}
                    />
                    <div hidden={!prostheticValue}>
                        <TextAreaInputField
                            name={prostheticDescName}
                            value={prostheticDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name={orthoticName}
                        value={orthoticValue}
                        actionHandler={actionHandler}
                        displayText={"Orthotic"}
                    />
                    <div hidden={!orthoticValue}>
                        <TextAreaInputField
                            name={orthoticDescName}
                            value={orthoticDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name={wheelchairRepairsName}
                        value={wheelchairRepairsValue}
                        actionHandler={actionHandler}
                        displayText={"Wheelchair Repairs"}
                    />
                    <div hidden={!wheelchairRepairsValue}>
                        <TextAreaInputField
                            name={wheelchairRepairsDescName}
                            value={wheelchairRepairsDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name={referralToHealthCentreName}
                        value={referralToHealthCentreValue}
                        actionHandler={actionHandler}
                        displayText={"Referral to Health Centre"}
                    />
                    <div hidden={!referralToHealthCentreValue}>
                        <TextAreaInputField
                            name={referralToHealthDescCentreName}
                            value={referralToHealthDescCentreValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name={healthAdviceName}
                        value={healthAdviceValue}
                        actionHandler={actionHandler}
                        displayText={"Health Advice"}
                    />
                    <div hidden={!healthAdviceValue}>
                        <TextAreaInputField
                            name={healthAdviceDescName}
                            value={healthAdviceDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name={healthAdvocacyName}
                        value={healthAdvocacyValue}
                        actionHandler={actionHandler}
                        displayText={"Health Advocacy"}
                    />
                    <div hidden={!healthAdvocacyValue} >
                        <TextAreaInputField
                            name={healthAdvocacyDescName}
                            value={healthAdvocacyDescValue}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>
                <div>
                    <CheckBox
                        name={healthEncouragementName}
                        value={healthEncouragementValue}
                        actionHandler={actionHandler}
                        displayText={"Health Encouragement"}
                    />
                    <div hidden={!healthEncouragementValue} >
                        <TextAreaInputField
                            name={healthEncouragementDescName}
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
                        dropdownName={healthGoalMetName}
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
                            name={healthGoalConclusionTextName}
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
