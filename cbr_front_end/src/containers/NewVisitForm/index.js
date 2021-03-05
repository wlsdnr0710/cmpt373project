import React, { useState, useEffect } from 'react';
import { getToken } from "../../utils/AuthenticationUtil";
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
    "BidiBidi Zone 1": "1",
    "BidiBidi Zone 2": "2",
    "BidiBidi Zone 3": "3",
    "BidiBidi Zone 4": "4",
    "BidiBidi Zone 5": "5",
    "Palorinya Basecamp": "6",
    "Palorinya Zone 1": "7",
    "Palorinya Zone 2": "8",
    "Palorinya Zone 3": "9",
};

const NewVisitForm = (props) => {
    

    const [formInputs, setFormInputs] = useState({
        "purpose": "cbr",
        "zone": "1",
        "villageNumber": "0",
        "latitude": "",
        "longitude": "",
        "date": "",
        "cbrWorkerName": "",
        "clientId": "",

        "serviceProvided": [],

        //Education Section
        "referralToEducationOrg": false,
        "educationAdvice": false,
        "educationAdvocacy": false,
        "educationEncouragement": false,
        "referralToEducationOrgDesc": "",
        "educationAdviceDesc": "",
        "educationAdvocacyDesc": "",
        "educationEncouragementDesc": "",

        //Social Section
        "referralToSocialOrg": false,
        "socialAdvice": false,
        "socialAdvocacy": false,
        "socialEncouragement": false,
        "referralToSocialOrgDesc": "",
        "socialAdviceDesc": "",
        "socialAdvocacyDesc": "",
        "socialEncouragementDesc": "",

        //Goals
        "healthGoalProgress": "N/A",
        "healthOutcome": "",

        "socialGoalProgress": "N/A",
        "socialOutcome": "",

        "educationGoalProgress": "N/A",
        "educationOutcome": "",

    });

    const [healthFormInputs, setHealthFormInputs] = useState({
        //Health Section
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
    });

    const [educationFormInputs, setEducationFormInputs] = useState({

    });

    const [healthCheckBox, setHealthCheckBox] = useState(false);
    const [educationCheckBox, setEducationCheckBox] = useState(false);
    const [socialCheckBox, setSocialCheckBox] = useState(false);

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
        //TODO: add to actual form
        let submittedForm = formInputs;
        submittedForm = updateFormInputsFromHealthForm(submittedForm);
        
        event.preventDefault();
        const sendingData = submittedForm;
        submitFormByPostRequest(sendingData);
    };



    const updateFormInputsFromHealthForm = (submittedForm) =>{
        if (healthFormInputs.wheelchair === true ){
            submittedForm = addServiceProvided("wheelchair", "health", healthFormInputs.wheelchairDesc, submittedForm);
        } 
        if (healthFormInputs.prosthetic === true){
            submittedForm = addServiceProvided("prosthetic", "health", healthFormInputs.prostheticDesc, submittedForm);
        }
        if (healthFormInputs.orthotic === true){
            submittedForm = addServiceProvided("orthotic", "health", healthFormInputs.orthoticDesc, submittedForm);
        }
        if (healthFormInputs.wheelchairRepairs === true){
            submittedForm = addServiceProvided("wheelchairRepairs", "health", healthFormInputs.wheelchairRepairsDesc, submittedForm);
        }
        if (healthFormInputs.referralToHealthCentre === true){
            submittedForm = addServiceProvided("referralToHealthCentre", "health", healthFormInputs.referralToHealthCentreDesc, submittedForm);
        }
        if (healthFormInputs.healthAdvice === true){
            submittedForm = addServiceProvided("healthAdvice", "health", healthFormInputs.healthAdviceDesc, submittedForm);
        }
        if (healthFormInputs.healthAdvocacy === true){
            submittedForm = addServiceProvided("healthAdvocacy", "health", healthFormInputs.healthAdvocacyDesc, submittedForm);
        }
        if (healthFormInputs.healthEncouragement === true){
            submittedForm = addServiceProvided("healthEncouragement", "health", healthFormInputs.healthEncouragementDesc, submittedForm);
        }
        
        return submittedForm
    }

    const submitFormByPostRequest = data => {
        const requestHeader = {
            token: getToken()
        };
        // ServerConfig.api.url + 
        axios.post('/api/v1/newVisits', {
            "data": data
        }, {
            headers: requestHeader,
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

        const purposeStr = "purpose";
        const cbrStr = "cbr";
        const educationGoalProgressStr = "educationGoalProgress";
        const socialGoalProgressStr = "socialGoalProgress";
        const concludedStr = "concluded"

        if (name === purposeStr && value !== cbrStr) {
            setPurposeCBR(false);
        } else if (name === purposeStr && value === cbrStr) {
            setPurposeCBR(true);
        }
        if (name === educationGoalProgressStr && value !== concludedStr) {
            setIsEducationGoalConcluded(false);
        } else if (name === educationGoalProgressStr && value === concludedStr) {
            setIsEducationGoalConcluded(true);
        }

        if (name === socialGoalProgressStr && value !== concludedStr) {
            setIsSocialGoalConcluded(false);
        } else if (name === socialGoalProgressStr && value === concludedStr) {
            setIsSocialGoalConcluded(true);
        }

        updateFormInputByNameValue(name, value);
    };

    const healthFormInputChangeHandler = event =>{
        const input = event.target;
        const name = input.name;
        const value = input.value;

        const healthGoalProgressStr = "healthGoalProgress";
        const concludedStr = "concluded"

        if (name === healthGoalProgressStr) {
            if (value !== concludedStr){
                setIsHealthGoalConcluded(false);
            } else if (value === concludedStr){
                setIsHealthGoalConcluded(true);
            }
            updateFormInputByNameValue(name, value);
        } else if (name === "healthOutcome"){
            updateFormInputByNameValue(name, value);
        }   else {
            updateHealthFormInputByNameValue(name, value);
        }
    }
    
    const updateHealthFormInputByNameValue = (name, value) => {
        setHealthFormInputs(prevFormInputs => {
            const newFormInputs = { ...prevFormInputs };
            newFormInputs[name] = value;
            return newFormInputs;
        });
    };

    const updateFormInputByNameValue = (name, value) => {
        setFormInputs(prevFormInputs => {
            const newFormInputs = { ...prevFormInputs };
            newFormInputs[name] = value;
            return newFormInputs;
        });
    };


    const addServiceProvided = (name, type, description, submittedForm) => {
        let testedValues = submittedForm["serviceProvided"];
        const serviceProvided = ({
            "description": "",
            "type": "",
            "service": {
                "name": "",
                "type": ""
            }
        });
        serviceProvided["description"] = description;
        serviceProvided["service"]["name"] = name;
        serviceProvided["service"]["type"] = type;
        serviceProvided["type"] = type;

        testedValues = [...testedValues, serviceProvided];
        submittedForm["serviceProvided"] = testedValues;
        updateFormInputByNameValue("serviceProvided", testedValues);
        return submittedForm;
    }

    const doHealthCheckBoxActionHandler = event => {
        const checkBox = event.target;
        const doHealthCheckBox = checkBox.checked;
        setIsHealthInputDisabled(!doHealthCheckBox);
        setHealthCheckBox(doHealthCheckBox);
    };

    const doEducationCheckBoxActionHandler = event => {
        const checkBox = event.target;
        const doEducationCheckBox = checkBox.checked;
        setIsEducationInputDisabled(!doEducationCheckBox);
        setEducationCheckBox(doEducationCheckBox);
    };

    const doSocialCheckBoxActionHandler = event => {
        const checkBox = event.target;
        const doSocialCheckBox = checkBox.checked;
        setIsSocialInputDisabled(!doSocialCheckBox)
        setSocialCheckBox(doSocialCheckBox);
    };

    const doProvidedHealthCheckBoxActionHandler = event => {
        const checkBox = event.target;
        const name = checkBox.name
        const isProvidedChecked = checkBox.checked;
        updateHealthFormInputByNameValue(name, isProvidedChecked);
    }

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
        updateFormInputByNameValue("date", Math.floor(newDate / 1000));
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
        updateFormInputByNameValue("clientId", props.clientID);
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
                            dropdownName="purpose"
                            value={formInputs["purpose"]}
                            dropdownListItemsKeyValue={defaultPurpose}
                            onChange={formInputChangeHandler}
                            isDisabled={false}
                        />
                    </div>
                    <div hidden={!isPurposeCBR}>
                        <CheckBox
                            name="doHealthCheckBox"
                            value={healthCheckBox}
                            actionHandler={doHealthCheckBoxActionHandler}
                            displayText={"Health"}
                        />
                        <CheckBox
                            name="doEducationCheckBox"
                            value={educationCheckBox}
                            actionHandler={doEducationCheckBoxActionHandler}
                            displayText={"Education"}
                        />
                        <CheckBox
                            name="doSocialCheckBox"
                            value={socialCheckBox}
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
                        dropdownName="zone"
                        value={formInputs["zone"]}
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
                        wheelchairValue={healthFormInputs["wheelchair"]}
                        prostheticValue={healthFormInputs["prosthetic"]}
                        orthoticValue={healthFormInputs["orthotic"]}
                        wheelchairRepairsValue={healthFormInputs["wheelchairRepairs"]}
                        referralToHealthCentreValue={healthFormInputs["referralToHealthCentre"]}
                        healthAdviceValue={healthFormInputs["healthAdvice"]}
                        healthAdvocacyValue={healthFormInputs["healthAdvocacy"]}
                        healthEncouragementValue={healthFormInputs["healthEncouragement"]}

                        wheelchairDescValue={healthFormInputs["wheelchairDesc"]}
                        prostheticDescValue={healthFormInputs["prostheticDesc"]}
                        orthoticDescValue={healthFormInputs["orthoticDesc"]}
                        wheelchairRepairsDescValue={healthFormInputs["wheelchairRepairsDesc"]}
                        referralToHealthCentreDescValue={healthFormInputs["referralToHealthCentreDesc"]}
                        healthAdviceDescValue={healthFormInputs["healthAdviceDesc"]}
                        healthAdvocacyDescValue={healthFormInputs["healthAdvocacyDesc"]}
                        healthEncouragementDescValue={healthFormInputs["healthEncouragementDesc"]}

                        healthGoalConclusionTextValue={formInputs["healthOutcome"]}
                        healthGoalMetValue={formInputs["healthGoalProgress"]}

                        actionHandler={doProvidedHealthCheckBoxActionHandler}
                        onChange={healthFormInputChangeHandler}
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

                        educationGoalConclusionTextName={"educationOutcome"}
                        educationGoalConclusionTextValue={formInputs["educationOutcome"]}
                        educationGoalMetName={"educationGoalProgress"}
                        educationGoalMetValue={formInputs["educationGoalProgress"]}
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

                        socialGoalConclusionTextName={"socialOutcome"}
                        socialGoalConclusionTextValue={formInputs["socialOutcome"]}
                        socialGoalMetName={"socialGoalProgress"}
                        socialGoalMetValue={formInputs["socialGoalProgress"]}
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