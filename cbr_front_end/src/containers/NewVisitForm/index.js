import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import FormHeader from "../../components/FormHeader";
import DropdownList from "../../components/DropdownList";
import CheckBox from "../../components/CheckBox";
import NumberInputField from "../../components/NumberInputField";
import NewClientVisitsHealthForm from "../NewVisitsHealthForm";
import NewClientVisitsEducationForm from "../NewVisitsEducationForm";
import NewClientVisitsSocialForm from "../NewVisitsSocialForm";
import axios from 'axios';
import ServerConfig from '../../config/ServerConfig';
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


const NewVisitForm = (props) => {

    const [formInputs, setFormInputs] = useState({
        "purposeForVisit": "cbr",
        "doHealthCheckBox": false,
        "doEducationCheckBox": false,
        "doSocialCheckBox": false,
        "clientZone": "bidizone1",
        "villageNumber": "0",
        "latitude": "",
        "longitude": "",
        "visitDate": "",
        "cbrWorkerName": "",
        "clientID": "",

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
    const [currLongitude, setCurrLongitude] = useState();
    const [currLatitude, setCurrLatitude] = useState();

    const [currDay, setCurrDay] = useState("");
    const [currMonth, setCurrMonth] = useState("");
    const [currYear, setCurrYear] = useState("");

    const [userName, setUserName] = useState(props.name);

    const onSubmitSurveyHandler = event => {
        event.preventDefault();
        const sendingData = { ...formInputs };
        submitFormByPostRequest(sendingData);
    };

    const submitFormByPostRequest = data => {
        axios.post(ServerConfig.api.url + '/api/v1/newVisits', {
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

        const purposeForVisitStr = "purposeForVisit";
        const cbrStr = "cbr";
        const healthGoalMetStr = "healthGoalMet";
        const educationGoalMetStr = "educationGoalMet";
        const socialGoalMetStr = "socialGoalMet";
        const concludedStr = "concluded"

        if (name === purposeForVisitStr && value !== cbrStr) {
            setPurposeCBR(false);
        } else if (name === purposeForVisitStr && value === cbrStr) {
            setPurposeCBR(true);
        }

        if (name === healthGoalMetStr && value !== concludedStr) {
            setIsHealthGoalConcluded(false);
        } else if (name === healthGoalMetStr && value === concludedStr) {
            setIsHealthGoalConcluded(true);
        }

        if (name === educationGoalMetStr && value !== concludedStr) {
            setIsEducationGoalConcluded(false);
        } else if (name === educationGoalMetStr && value === concludedStr) {
            setIsEducationGoalConcluded(true);
        }

        if (name === socialGoalMetStr && value !== concludedStr) {
            setIsSocialGoalConcluded(false);
        } else if (name === socialGoalMetStr && value === concludedStr) {
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

    const initEpochDateTime = () => {
        let newDate = new Date();
        setCurrDay(newDate.getDate());
        setCurrMonth(newDate.getMonth() + 1);
        setCurrYear(newDate.getFullYear());
        updateFormInputByNameValue("cbrWorkerName", userName);
        updateFormInputByNameValue("visitDate", Math.floor(newDate / 1000));
    }

    const initGeolocation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setCurrLatitude(position.coords.latitude);
            setCurrLongitude(position.coords.longitude);
            updateFormInputByNameValue("latitude", currLatitude);
            updateFormInputByNameValue("longitude", currLongitude);
        });
    }

    useEffect(() => {
        updateFormInputByNameValue("clientID", props.clientID);
        initEpochDateTime();
        initGeolocation();
    }, []);

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
                    <label>Date of Visit: {currYear}-{currMonth}-{currDay}</label>
                </div>
                <hr />
                <div>
                    <label>Name of CBR worker: {userName}</label>
                </div>
                <hr />
                <div>
                    <label >Location of Visit (GPS) :</label>
                    <div>
                        <label>Latitude : {currLatitude}</label>
                    </div>
                    <div>
                        <label >Longitude : {currLongitude}</label>
                    </div>
                </div>
                <hr />
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
                <hr />
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
                    <NewClientVisitsSocialForm
                        referralToSocialOrgName={"referralToSocialOrg"}
                        referralToSocialOrgValue={formInputs["referralToSocialOrg"]}
                        referralToSocialOrgNameDescName={"referralToSocialOrgDesc"}
                        referralToSocialOrgNameDescValue={formInputs["referralToSocialOrgDesc"]}
                        socialAdviceName={"socialAdvice"}
                        socialAdviceValue={formInputs["socialdvice"]}
                        socialAdviceDescName={"socialAdviceDesc"}
                        socialAdviceDescValue={formInputs["socialAdviceDesc"]}
                        socialAdvocacyName={"socialAdvocacy"}
                        socialAdvocacyValue={formInputs["socialAdvocacy"]}
                        socialAdvocacyDescName={"esocialAdvocacyDesc"}
                        socialAdvocacyDescValue={formInputs["socialAdvocacyDesc"]}
                        socialEncouragementName={"socialEncouragement"}
                        socialEncouragementValue={formInputs["socialEncouragement"]}
                        socialEncouragementDescName={"socialEncouragementDesc"}
                        socialEncouragementDescValue={formInputs["socialEncouragement"]}

                        socialGoalConclusionTextName={"socialGoalConclusionText"}
                        socialGoalConclusionTextValue={formInputs["socialGoalConclusionText"]}
                        socialGoalMetName={"socialGoalMet"}
                        socialGoalMetValue={formInputs["socialGoalMet"]}
                        isSocialGoalConcluded={isSocialGoalConcluded}
                        actionHandler={doProvidedCheckBoxActionHandler}
                        onChange={formInputChangeHandler}
                        goalInputs={defaultGoalInputs}
                    />
                    <hr />
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