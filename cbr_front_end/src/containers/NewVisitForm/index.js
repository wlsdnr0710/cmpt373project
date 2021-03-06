import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getToken, getWorkerIdFromToken } from "../../utils/AuthenticationUtil";
import {
    getZonesFromServer,
    addVisitToServer,
    getWorkerInformationFromServer,
    postNewServiceDescription,
    deleteVisitFromServer,
    getClientObject,
    getClientInformationFromServer,
    getServiceOptions,
} from "../../utils/Utilities";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import FormHeader from "../../components/FormHeader";
import DropdownList from "../../components/DropdownList";
import CheckBox from "../../components/CheckBox";
import TextAreaInputField from "../../components/TextAreaInputField";
import NumberInputField from "../../components/NumberInputField";
import NewClientVisitsHealthForm from "../NewVisitsHealthForm";
import NewClientVisitsEducationForm from "../NewVisitsEducationForm";
import NewClientVisitsSocialForm from "../NewVisitsSocialForm";
import "./style.css";

const defaultPurpose = {
    "CBR": "cbr",
    "Disability centre referral": "referral",
    "Disability centre follow up": "followUp",
};

const defaultGoalInputs = {
    "Cancelled": "CANCELLED",
    "Ongoing": "ONGOING",
    "Concluded": "CONCLUDED",
};

const NewVisitForm = (props) => {
    const clientId = props.clientID;
    const history = useHistory();
    const workerId = getWorkerIdFromToken(getToken());
    const [formInputs, setFormInputs] = useState({
        "consent" : 1,
        "purpose": "cbr",
        "zone": 1,
        "villageNumber": "0",
        "date": "",
        "cbrWorkerName": "",
        "clientId": "",
        "workerId": workerId,
        "serviceProvided": [],
        "latitude" : "",
        "longitude" : "",

        //Goals
        "healthGoalProgress": "CANCELLED",
        "healthOutcome": "",
        "socialGoalProgress": "CANCELLED",
        "socialOutcome": "",
        "educationGoalProgress": "CANCELLED",
        "educationOutcome": "",
    });

    const [healthServiceOptions, setHealthServiceOptions] = useState([]);
    const [educationServiceOptions, setEducationServiceOptions] = useState([]);
    const [socialServiceOptions, setSocialServiceOptions] = useState([]);

    const [clientInformation, setClientInformation] = useState(
        getClientObject()
    );
    const [zoneList, setZoneList] = useState({});
    const [healthCheckBox, setHealthCheckBox] = useState(false);
    const [educationCheckBox, setEducationCheckBox] = useState(false);
    const [socialCheckBox, setSocialCheckBox] = useState(false);

    const [isHealthInputDisabled, setIsHealthInputDisabled] = useState(true);
    const [isEducationInputDisabled, setIsEducationInputDisabled] = useState(true);
    const [isSocialInputDisabled, setIsSocialInputDisabled] = useState(true);

    const [isHealthGoalConcluded, setIsHealthGoalConcluded] = useState(false);
    const [isEducationGoalConcluded, setIsEducationGoalConcluded] = useState(false);
    const [isSocialGoalConcluded, setIsSocialGoalConcluded] = useState(false);

    const [currLongitude, setCurrLongitude] = useState();
    const [currLatitude, setCurrLatitude] = useState();

    const [currDay, setCurrDay] = useState("");
    const [currMonth, setCurrMonth] = useState("");
    const [currYear, setCurrYear] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const getServiceOptionsList = () => {
        const requestHeader = {
            token: getToken()
        };
        getServiceOptions(requestHeader)
            .then((response) => {
                setServiceOptions(response.data.data);
            })
            .catch((error) => {
                console.log("ERROR: Get request failed. " + error);
            });
    }

    const setServiceOptions = (serviceOptionsList) => {
        let healthServiceOptions = [];
        let educationServiceOptions = [];
        let socialServiceOptions = [];

        for (const serviceOption of serviceOptionsList) {
            serviceOption.hidden = true;
            serviceOption.desc = "";
            serviceOption.checked = false;
            if (serviceOption.type === "HEALTH") {
                healthServiceOptions = [...healthServiceOptions, serviceOption];
            } else if (serviceOption.type === "EDUCATION") {
                educationServiceOptions = [...educationServiceOptions, serviceOption];
            } else if (serviceOption.type === "SOCIAL") {
                socialServiceOptions = [...socialServiceOptions, serviceOption]
            }
        }

        setHealthServiceOptions(healthServiceOptions);
        setEducationServiceOptions(educationServiceOptions);
        setSocialServiceOptions(socialServiceOptions);
    }

    const getClientInformation = useCallback(() => {
        const requestHeader = {
            token: getToken(),
        };
        getClientInformationFromServer(clientId, requestHeader)
            .then((response) => {
                setClientInformation(response.data.data);
            })
            .catch((error) => {
                console.log("ERROR: Get request failed. " + error);
            });
    }, [clientId]);

    const onSubmitSurveyHandler = event => {
        clearErrorMessages();
        let submittedForm = formInputs;
        if (healthCheckBox){
            submittedForm = updateFormInputs(submittedForm, healthServiceOptions);
        }
        if (educationCheckBox){
            submittedForm = updateFormInputs(submittedForm, educationServiceOptions);
        }
        if (socialCheckBox){
            submittedForm = updateFormInputs(submittedForm, socialServiceOptions);
        }
        event.preventDefault();
        const sendingData = submittedForm;
        submitFormByPostRequest(sendingData);
    };

    const updateFormInputs = (submittedForm, serviceOptions) =>{
        // Have to call Object.values to make the options iterable
        for (const serviceOption of Object.values(serviceOptions)) {
            if (serviceOption.checked) {
                submittedForm = addServiceProvided(serviceOption.id, serviceOption.desc, submittedForm);
            }
        }
        return submittedForm;
    }
    
    const submitFormByPostRequest = data => {
        setStatesWhenFormIsSubmitting(true);
        const requestHeader = {
            token: getToken()
        };
        let descriptionFailed = false;
        let descriptionError = "";
        addVisitToServer(data, requestHeader)
            .then(async (response) => {
                for (const serviceOption of data.serviceProvided) {
                    serviceOption.visitId = response.data.id;
                    await postNewServiceDescription(serviceOption, requestHeader)
                        .catch(error => {
                            deleteVisitFromServer(response.data.id, requestHeader)
                                .catch(error => {
                                    // Failure here is likely a technical issue
                                    console.log(error);
                                })
                            // Propagate error up into higher then
                            descriptionFailed = true;
                            descriptionError = error;
                        })
                }
                    
            })
            .then(response => {
                if (descriptionFailed) {
                    throw descriptionError;
                }
                setFormStateAfterSubmitSuccess();
                const clientId = props.clientID;
                const oneSecond = 1;
                redirectToClientInfoPageAfter(clientId, oneSecond);
            })
            .catch(error => {
                clearDescriptions();
                updateErrorMessages(error);
                setStatesWhenFormIsSubmitting(false);
            });
    };

    const clearDescriptions = () => {
        updateFormInputByNameValue("serviceProvided", "");
    };

    const getZones = () => {
        getZonesFromServer()
        .then(response => {
            setZoneList(response.data.data);
        });
    };

    const getWorkerNameByGetRequest = () => {
        const requestHeader = {
            token: getToken()
        };
        getWorkerInformationFromServer(workerId, requestHeader)
        .then(response => {
            updateFormInputByNameValue("cbrWorkerName", response.data.data.firstName + " " + response.data.data.lastName);
        })
        .catch(error => {
            updateFormInputByNameValue("cbrWorkerName" , "Unable to fetch CBR worker name");
        });
    };

    const redirectToClientInfoPageAfter = (clientId, timeInSecond) => {
        const timeInMilliSecond = timeInSecond * 1000;
        setTimeout(() => {
            history.push("/client-information?id=" + clientId);
            window.scrollTo(0, 0);
        }, timeInMilliSecond);
    };

    const formInputChangeHandler = event => {
        const input = event.target;
        const name = input.name;
        const value = input.value;
        updateFormInputByNameValue(name, value);
    };

    const healthDescriptionHandler = event => {
        const input = event.target;
        const index = input.name;
        const value = input.value;
        updateHealthDescriptionByIndexAndValue(index, value);
    };

    const healthFormInputChangeHandler = event =>{
        const input = event.target;
        const name = input.name;
        const value = input.value;
        const concludedStr = "CONCLUDED"

        if (name === "healthGoalProgress") {
            if (value !== concludedStr){
                setIsHealthGoalConcluded(false);
            } else if (value === concludedStr){
                setIsHealthGoalConcluded(true);
            }
            updateFormInputByNameValue(name, value);
        } else if (name === "healthOutcome"){
            updateFormInputByNameValue(name, value);
        }
    };

    const educationDescriptionHandler = event => {
        const input = event.target;
        const index = input.name;
        const value = input.value;
        updateEducationDescriptionByIndexAndValue(index, value);
    };

    const educationFormInputChangeHandler = event =>{
        const input = event.target;
        const name = input.name;
        const value = input.value;
        const concludedStr = "CONCLUDED";

        if (name === "educationGoalProgress") {
            if (value !== concludedStr){
                setIsEducationGoalConcluded(false);
            } else if (value === concludedStr){
                setIsEducationGoalConcluded(true);
            }
            updateFormInputByNameValue(name, value);
        } else if (name === "educationOutcome"){
            updateFormInputByNameValue(name, value);
        }
    };

    const socialDescriptionHandler = event => {
        const input = event.target;
        const index = input.name;
        const value = input.value;
        updateSocialDescriptionByIndexAndValue(index, value);
    };

    const socialFormInputChangeHandler = event =>{
        const input = event.target;
        const name = input.name;
        const value = input.value;
        const concludedStr = "CONCLUDED"

        if (name === "socialGoalProgress") {
            if (value !== concludedStr){
                setIsSocialGoalConcluded(false);
            } else if (value === concludedStr){
                setIsSocialGoalConcluded(true);
            }
            updateFormInputByNameValue(name, value);
        } else if (name === "socialOutcome"){
            updateFormInputByNameValue(name, value);
        }
    };

    const updateHealthDescriptionByIndexAndValue = (index, value) => {
        setHealthServiceOptions(prevOptions => {
            const newOptionsList = { ...prevOptions };
            newOptionsList[index].desc = value;
            return newOptionsList;
        });
    };

    const checkHealthServiceOptionsByIndexAndValue = (index, value) => {
        setHealthServiceOptions(prevOptions => {
            const newOptionsList = { ...prevOptions };
            newOptionsList[index].checked = value;
            newOptionsList[index].hidden = !value;
            return newOptionsList;
        });
    };

    const updateEducationDescriptionByIndexAndValue = (index, value) => {
        setEducationServiceOptions(prevOptions => {
            const newOptionsList = { ...prevOptions };
            newOptionsList[index].desc = value;
            return newOptionsList;
        });
    };

    const checkEducationServiceOptionsByIndexAndValue = (index, value) => {
        setEducationServiceOptions(prevOptions => {
            const newOptionsList = { ...prevOptions };
            newOptionsList[index].checked = value;
            newOptionsList[index].hidden = !value;
            return newOptionsList;
        });
    };

    const updateSocialDescriptionByIndexAndValue = (index, value) => {
        setSocialServiceOptions(prevOptions => {
            const newOptionsList = { ...prevOptions };
            newOptionsList[index].desc = value;
            return newOptionsList;
        });
    };

    const checkSocialServiceOptionsByIndexAndValue = (index, value) => {
        setSocialServiceOptions(prevOptions => {
            const newOptionsList = { ...prevOptions };
            newOptionsList[index].checked = value;
            newOptionsList[index].hidden = !value;
            return newOptionsList;
        });
    };

    const updateFormInputByNameValue = (name, value) => {
        setFormInputs(prevFormInputs => {
            const newFormInputs = { ...prevFormInputs };
            newFormInputs[name] = value;
            return newFormInputs;
        });
    };

    const addServiceProvided = (serviceOptionId, description, submittedForm) => {
        let testedValues = submittedForm["serviceProvided"];
        const serviceProvided = ({
            "description": "",
            "serviceOptionId": ""
        });
        serviceProvided["description"] = description;
        serviceProvided["serviceOptionId"] = serviceOptionId;

        testedValues = [...testedValues, serviceProvided];
        submittedForm["serviceProvided"] = testedValues;
        updateFormInputByNameValue("serviceProvided", testedValues);
        return submittedForm;
    };

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
        const id = checkBox.value;
        const isProvidedChecked = checkBox.checked;
        checkHealthServiceOptionsByIndexAndValue(id, isProvidedChecked);
    };

    const doProvidedEducationCheckBoxActionHandler = event => {
        const checkBox = event.target;
        const id = checkBox.value;
        const isProvidedChecked = checkBox.checked;
        checkEducationServiceOptionsByIndexAndValue(id, isProvidedChecked);
    };

    const doProvidedSocialCheckBoxActionHandler = event => {
        const checkBox = event.target;
        const id = checkBox.value;
        const isProvidedChecked = checkBox.checked;
        checkSocialServiceOptionsByIndexAndValue(id, isProvidedChecked);
    };

    const initEpochDateTime = () => {
        let newDate = new Date();
        setCurrDay(newDate.getDate());
        setCurrMonth(newDate.getMonth() + 1);
        setCurrYear(newDate.getFullYear());
        updateFormInputByNameValue("date", Math.floor(newDate.getTime()));
    };

    const initGeolocation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setCurrLatitude(position.coords.latitude);
            setCurrLongitude(position.coords.longitude);
            updateFormInputByNameValue("latitude", position.coords.latitude);
            updateFormInputByNameValue("longitude", position.coords.longitude);
        });
    };

    const updateErrorMessages = error => {
        setErrorMessages(prevErrorMessages => {
            let messages = ["Something went wrong on the server."];
            if (error.response) {
                messages = error.response.data.messages;
            }
            const newMessages = [...prevErrorMessages, ...messages];
            return newMessages;
        });
    };

    const showErrorMessages = () => {
        if (hasErrorMessages()) {
            const msgInDivs = packMessagesInDivs(errorMessages);
            return (
                <Alert variant="danger">
                    {msgInDivs}
                </Alert>
            );
        } else {
            return null;
        }
    };

    const packMessagesInDivs = messages => {
        const msgInDivs = [];
        for (const idx in messages) {
            const msg = messages[idx];
            msgInDivs.push(
                <div key={idx}>
                    {msg}
                </div>
            );
        }
        return msgInDivs;
    };

    const setStatesWhenFormIsSubmitting = isSubmitting => {
        if (isSubmitting) {
            setIsSubmitting(true);
        } else {
            setIsSubmitting(false);
        }
    };

    const showSuccessMessage = () => {
        if (isSubmitSuccess) {
            return (
                <Alert variant="success">
                    You submitted the form successfully! You will be redirected to the client page soon.
                </Alert>
            );
        } else {
            return null;
        }
    };

    const setFormStateAfterSubmitSuccess = () => {
        setIsSubmitSuccess(true);
        setIsSubmitting(false);
    };

    const hasErrorMessages = () => {
        return errorMessages.length !== 0;
    };

    const clearErrorMessages = () => {
        setErrorMessages([]);
    };

    const createServiceOptionComponents = (serviceOptions, actionHandler, onChange) => {
        const serviceOptionComponents = [];
        if(serviceOptions === undefined || serviceOptions.length === 0) {
            return null;
        }
        else {
            for (const index in serviceOptions) {
                const name = serviceOptions[index].name;
                serviceOptionComponents.push(
                    <CheckBox
                        name={name}
                        value={index}
                        actionHandler={actionHandler}
                        displayText={name}
                        key={index}
                    />
                );
                serviceOptionComponents.push(
                    <div hidden={serviceOptions[index].hidden} key={index + "DescDiv"}>
                        <TextAreaInputField
                            name={index}
                            value={serviceOptions[index].desc}
                            onChange={onChange}
                            rows="4"
                            isDisabled={false}
                            key={index + "Desc"}
                        />
                    </div>
                );

            }
            return serviceOptionComponents;
        }
    };

    useEffect(() => {
        getWorkerNameByGetRequest();
        getZones();
        getServiceOptionsList();
        updateFormInputByNameValue("clientId", props.clientID);
        initEpochDateTime();
        initGeolocation();
        getClientInformation();
    }, [getClientInformation]);

    return (
        <div>
            <FormHeader
                headerText="New Visit - Visit Information"
            />
            <div className="new-visit-form">
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
                    <div>
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
                    <label>Date of Visit: {currDay}/{currMonth}/{currYear}</label>
                </div>
                <hr />
                <div>
                    <label>Name of CBR worker: {formInputs["cbrWorkerName"]}</label>
                </div>
                <hr />
                <div>
                    <label>Health Goal: {clientInformation.healthGoal}</label>
                </div>
                <div>
                    <label>Education Goal: {clientInformation.educationGoal}</label>
                </div>
                <div>
                    <label>Social Goal: {clientInformation.socialGoal}</label>
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
                        dropdownListItemsKeyValue={zoneList}
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
                <div hidden={(isHealthInputDisabled)}>
                    <NewClientVisitsHealthForm
                        healthServiceOptions={healthServiceOptions}
                        createServiceOptionComponents={createServiceOptionComponents}
                        healthGoalConclusionTextValue={formInputs["healthOutcome"]}
                        healthGoalMetValue={formInputs["healthGoalProgress"]}
                        actionHandler={doProvidedHealthCheckBoxActionHandler}
                        onChange={healthFormInputChangeHandler}
                        descriptionHandler={healthDescriptionHandler}
                        goalInputs={defaultGoalInputs}
                        isHealthGoalConcluded={isHealthGoalConcluded}
                    />
                    <hr />
                </div>

                <div hidden={(isEducationInputDisabled)}>
                    <NewClientVisitsEducationForm
                        educationServiceOptions={educationServiceOptions}
                        createServiceOptionComponents={createServiceOptionComponents}
                        educationGoalConclusionTextValue={formInputs["educationOutcome"]}
                        educationGoalMetValue={formInputs["educationGoalProgress"]}
                        isEducationGoalConcluded={isEducationGoalConcluded}
                        actionHandler={doProvidedEducationCheckBoxActionHandler}
                        onChange={educationFormInputChangeHandler}
                        descriptionHandler={educationDescriptionHandler}
                        goalInputs={defaultGoalInputs}
                    />
                    <hr />
                </div>

                <div hidden={(isSocialInputDisabled)}>
                    <NewClientVisitsSocialForm
                        socialServiceOptions={socialServiceOptions}
                        createServiceOptionComponents={createServiceOptionComponents}
                        socialGoalConclusionTextValue={formInputs["socialOutcome"]}
                        socialGoalMetValue={formInputs["socialGoalProgress"]}
                        isSocialGoalConcluded={isSocialGoalConcluded}
                        actionHandler={doProvidedSocialCheckBoxActionHandler}
                        onChange={socialFormInputChangeHandler}
                        descriptionHandler={socialDescriptionHandler}
                        goalInputs={defaultGoalInputs}
                    />
                    <hr />
                </div>
                <hr />
                {showErrorMessages()}
                {showSuccessMessage()}
                <Button
                    variant="primary"
                    size="lg"
                    disabled={false}
                    onClick={onSubmitSurveyHandler}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default NewVisitForm;