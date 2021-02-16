import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FormHeader from "../../components/FormHeader";
import DropdownList from "../../components/DropdownList";
import CheckBox from "../../components/CheckBox";
import NumberInputField from "../../components/NumberInputField";
import TextAreaInputField from "../../components/TextAreaInputField";
import axios from 'axios';
import Logo from "../../assets/HHALogo.svg";
import NewClientVisitsHealthForm from "../NewVisitsHealthForm"
import NewClientVisitsEducationForm from "../NewVisitsEducationForm"
import NewClientVisitsSocialForm from "../NewVisitsSocialForm"
import "./style.css";

// TODO: We want to fetch zones from backend server instead of hardcoding them here.
const defaultPurpose = {
    "CBR": "cbr",
    "Disability centre referral": "referral",
    "Disability centre follow up": "followUp",
};

const defaultGoalInputs = {
    "Cancelled": "cancelled",
    "Ongoin": "ongoing",
    "Concluded": "concluded",
};

const defaultClientZones = {
    "BidiBidi Zone 1": "bidizone1",
    "BidiBidi Zone 2": "bidizone2",
    "BidiBidi Zone 3": "bidizone3",
    "BidiBidi Zone 4": "bidizone4",
    "BidiBidi Zone 5": "bidizone5",
    "Palorinya Basecamp": "palBasecamp",
    "Palorinya Zone 1": "palzone1",
    "Palorinya Zone 2": "palzone2",
    "Palorinya Zone 3": "palzone3",
};

const NewVisitForm = () => {

    const [formInputs, setFormInputs] = useState({
        "purposeForVisit": "cbr",
        "doHealthCheckBox": false,
        "doEducationCheckBox": false,
        "doSocialCheckBox": false,
        "clientZone": "bidizone1",
        "villageNumber": "",

        // Health Section
        "wheelchair": false,
        "prosthetic": false,
        "orthotic": false,
        "wheelchairRepairs": false,
        "referralToHealthCentre": false,
        "healthAdvice": false,
        "healthAdvocacy": false,
        "healthEncouragement": false,
        "wheelchairDesc": "",
        "prostheticDesc": "",
        "orthoticDesc": "",
        "wheelchairRepairsDesc": "",
        "referralToHealthCentreDesc": "",
        "healthAdviceDesc": "",
        "healthAdvocacyDesc": "",
        "healthEncouragementDesc": "",
        "healthGoalMet": "cancelled",
        "healthGoalConclusionText": "",

        //Education Section
        "referralToEducationOrg": false,
        "educationAdvice": false,
        "educationAdvocacy": false,
        "educationEncouragement": false,
        "referralToEducationOrgDesc": "",
        "educationAdviceDesc": "",
        "educationAdvocacyDesc": "",
        "educationEncouragementDesc": "",
        "educationGoalMet": "cancelled",
        "educationConclusionText": "",

        //Social Section
        "referralToSocialOrg": false,
        "socialAdvice": false,
        "socialAdvocacy": false,
        "socialEncouragement": false,
        "referralToSocialOrgDesc": "",
        "socialAdviceDesc": "",
        "socialAdvocacyDesc": "",
        "socialEncouragementDesc": "",
        "socialGoalMet": "cancelled",
        "socialConclusionText": "",

    });

    const [isHealthInputDisabled, setIsHealthInputDisabled] = useState(true);
    const [isEducationInputDisabled, setIsEducationInputDisabled] = useState(true);
    const [isSocialInputDisabled, setIsSocialInputDisabled] = useState(true);

    const [isHealthGoalConcluded, setIsHealthGoalConcluded] = useState(false);
    const [isEducationGoalConcluded, setIsEducationGoalConcluded] = useState(false);
    const [isSocialGoalConcluded, setIsSocialGoalConcluded] = useState(false);

    const [isPurposeCBR, setPurposeCBR] = useState(true);

    const onSubmitSurveyHandler = event => {
        event.preventDefault();
        // We do not set state here because setState is asynchronous.
        // State may not be updated when we submit the form.
        const sendingData = { ...formInputs };
        submitFormByPostRequest(sendingData);
    };

    const submitFormByPostRequest = data => {
        axios.post('/api/v1/client', {
            "data": data
        })
            .then(response => {

            })
            .catch(error => {

            });
    };


    const formInputChangeHandler = event => {
        const input = event.target;
        const name = input.name;
        const value = input.value;

        if (name === "purposeForVisit" && value !== "cbr") {
            setPurposeCBR(false);
        } else if (name === "purposeForVisit" && value === "cbr") {
            setPurposeCBR(true);
        }

        if (name === "healthGoalMet" && value !== "concluded") {
            setIsHealthGoalConcluded(false);
        } else if (name === "healthGoalMet" && value === "concluded") {
            setIsHealthGoalConcluded(true);
        }
        if (name === "educationGoalMet" && value !== "concluded") {
            setIsEducationGoalConcluded(false);
        } else if (name === "educationGoalMet" && value === "concluded") {
            setIsEducationGoalConcluded(true);
        }

        if (name === "socialGoalMet" && value !== "concluded") {
            setIsSocialGoalConcluded(false);
        } else if (name === "socialGoalMet" && value === "concluded") {
            setIsSocialGoalConcluded(true);
        }

        updateFormInputByNameValue(name, value);
    };

    const updateFormInputByNameValue = (name, value) => {
        setFormInputs(prevFormInputs => {
            const newFormInputs = { ...prevFormInputs };
            newFormInputs[name] = value;
            return newFormInputs;
        });
    };

    const doHealthCheckBoxActionHandler = event => {
        const checkBox = event.target;
        const doHealthCheckBox = checkBox.checked;
        setIsHealthInputDisabled(!doHealthCheckBox);
        updateFormInputByNameValue("doHealthCheckBox", doHealthCheckBox);
    };

    const doEducationCheckBoxActionHandler = event => {
        const checkBox = event.target;
        const doEducationCheckBox = checkBox.checked;
        setIsEducationInputDisabled(!doEducationCheckBox);
        updateFormInputByNameValue("doEducationCheckBox", doEducationCheckBox);
    };

    const doSocialCheckBoxActionHandler = event => {
        const checkBox = event.target;
        const doSocialCheckBox = checkBox.checked;
        setIsSocialInputDisabled(!doSocialCheckBox)
        updateFormInputByNameValue("doSocialCheckBox", doSocialCheckBox);
    };


    const doProvidedCheckBoxActionHandler = event => {
        const checkBox = event.target;
        const name = checkBox.name
        const isProvidedChecked = checkBox.checked;
        updateFormInputByNameValue(name, isProvidedChecked);
    }



    return (
        <div className="new-visit-form">
            <FormHeader
                headerText="New Visit - Visit Information"
            />
            <div className="form-body">
                <div className="input-field-container">
                    <div className="label-container">
                        <label>Purpose for Visit:</label>
                    </div>
                    <div>
                        <DropdownList
                            dropdownName="purposeForVisit"
                            value={formInputs["purposeForVisit"]}
                            dropdownListItemsKeyValue={defaultPurpose}
                            onChange={formInputChangeHandler}
                            isDisabled={false}
                        />
                    </div>
                    <div hidden={!isPurposeCBR}>
                        <CheckBox
                            name="doHealthCheckBox"
                            value={formInputs["doHealthCheckBox"]}
                            actionHandler={doHealthCheckBoxActionHandler}
                            displayText={"Health"}
                        />
                        <CheckBox
                            name="doEducationCheckBox"
                            value={formInputs["doEducationCheckBox"]}
                            actionHandler={doEducationCheckBoxActionHandler}
                            displayText={"Education"}
                        />
                        <CheckBox
                            name="doSocialCheckBox"
                            value={formInputs["doSocialCheckBox"]}
                            actionHandler={doSocialCheckBoxActionHandler}
                            displayText={"Social"}
                        />
                    </div>
                </div>
                <hr />
                <div>
                    <label>Date of Visit:</label>
                </div>
                <div>
                    <label>Name of CBR worker:</label>
                </div>
                <div>
                    <label>Location of Visit(GPS)</label>
                </div>
                <div>
                    <div>
                        <label>Location</label>
                    </div>
                    <DropdownList
                        dropdownName="clientZone"
                        value={formInputs["clientZone"]}
                        dropdownListItemsKeyValue={defaultClientZones}
                        onChange={formInputChangeHandler}
                        isDisabled={false}
                    />
                </div>
                <div className="input-field-container">
                    <div className="label-container">
                        <label>Village Number:</label>
                    </div>
                    <NumberInputField
                        name="villageNumber"
                        value={formInputs["villageNumber"]}
                        onChange={formInputChangeHandler}
                        isDisabled={false}
                    />
                </div>
                <hr />
                <div hidden={(isHealthInputDisabled) || (!isPurposeCBR)}>
                    <NewClientVisitsHealthForm
                        wheelchairName="wheelchair"
                        wheelchairValue={formInputs["wheelchair"]}
                        prostheticName="prosthetic"
                        prostheticValue={formInputs["prosthetic"]}
                        orthoticName="orthotic"
                        orthoticValue={formInputs["orthotic"]}
                        wheelchairRepairsName="wheelchairRepairs"
                        wheelchairRepairsValue={formInputs["wheelchairRepairs"]}
                        referralToHealthCentreName="referralToHealthCentre"
                        referralToHealthCentreValue={formInputs["referralToHealthCentre"]}
                        healthAdviceName="healthAdvice"
                        healthAdviceValue={formInputs["healthAdvice"]}
                        healthAdvocacyName="healthAdvocacy"
                        healthAdvocacyValue={formInputs["healthAdvocacy"]}
                        healthEncouragementName="healthEncouragement"
                        healthEncouragementValue={formInputs["healthEncouragement"]}
                        healthGoalConclusionTextName="healthGoalConclusionText"
                        healthGoalConclusionTextValue={formInputs["healthGoalConclusionText"]}
                        healthGoalMetName="healthGoalMet"
                        healthGoalMetValue={formInputs["healthGoalMet"]}

                        wheelchairDescName="wheelchairDesc"
                        wheelchairDescValue={formInputs["wheelchairDesc"]}
                        prostheticDescName="prostheticDesc"
                        prostheticDescValue={formInputs["prostheticDesc"]}
                        orthoticDescName="orthoticDesc"
                        orthoticDescValue={formInputs["orthoticDesc"]}
                        wheelchairRepairsDescName="wheelchairRepairsDesc"
                        wheelchairRepairsDescValue={formInputs["wheelchairRepairsDesc"]}
                        referralToHealthCentreDescName="referralToHealthCentreDesc"
                        referralToHealthCentreDescValue={formInputs["referralToHealthCentreDesc"]}
                        healthAdviceDescName="healthAdviceDesc"
                        healthAdviceDescValue={formInputs["healthAdviceDesc"]}
                        healthAdvocacyDescName="healthAdvocacyDesc"
                        healthAdvocacyDescValue={formInputs["healthAdvocacyDesc"]}
                        healthEncouragementDescName="healthEncouragementDesc"
                        healthEncouragementDescValue={formInputs["healthEncouragementDesc"]}

                        healthGoalConclusionTextName="healthGoalConclusionText"
                        healthGoalConclusionTextValue={formInputs["healthGoalConclusionText"]}
                        healthGoalMetName="healthGoalMet"
                        healthGoalMetValue={formInputs["healthGoalMet"]}

                        actionHandler={doProvidedCheckBoxActionHandler}
                        onChange={formInputChangeHandler}
                        goalInputs={defaultGoalInputs}
                        isHealthGoalConcluded={isHealthGoalConcluded}
                    />
                    <hr />
                </div>

                <div hidden={(isEducationInputDisabled) || (!isPurposeCBR)}>
                    <NewClientVisitsEducationForm
                        referralToEducationOrgName={"referralToEducationOrg"}
                        referralToEducationOrgValue={formInputs["referralToEducationOrg"]}
                        referralToEducationOrgNameDescName={"referralToEducationOrgDesc"}
                        referralToEducationOrgNameDescValue={formInputs["referralToEducationOrgDesc"]}
                        educationAdviceName={"educationAdvice"}
                        educationAdviceValue={formInputs["educationAdvice"]}
                        educationAdviceDescName={"educationAdviceDesc"}
                        educationAdviceDescValue={formInputs["educationAdviceDesc"]}
                        educationAdvocacyName={"educationAdvocacy"}
                        educationAdvocacyValue={formInputs["educationAdvocacy"]}
                        educationAdvocacyDescName={"educationAdvocacyDesc"}
                        educationAdvocacyDescValue={formInputs["educationAdvocacyDesc"]}
                        educationEncouragementName={"educationEncouragement"}
                        educationEncouragementValue={formInputs["educationEncouragement"]}
                        educationEncouragementDescName={"educationEncouragementDesc"}
                        educationEncouragementDescValue={formInputs["educationEncouragement"]}

                        educationGoalConclusionTextName={"educationGoalConclusionText"}
                        educationGoalConclusionTextValue={formInputs["educationGoalConclusionText"]}
                        educationGoalMetName={"educationGoalMet"}
                        educationGoalMetValue={formInputs["educationGoalMet"]}
                        isEducationGoalConcluded={isEducationGoalConcluded}
                        actionHandler={doProvidedCheckBoxActionHandler}
                        onChange={formInputChangeHandler}
                        goalInputs={defaultGoalInputs}
                    />
                    <hr />
                </div>

                <div hidden={(isSocialInputDisabled) || (!isPurposeCBR)}>

                </div>
                <hr />
                <Button
                    variant="primary"
                    size="lg"
                    disabled={false}
                    onClick={onSubmitSurveyHandler}
                >
                    Submit
                </Button>
            </div>
        </div >
    );

}

export default NewVisitForm;