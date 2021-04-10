import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getToken, getWorkerIdFromToken } from "../../utils/AuthenticationUtil";
import { getZonesFromServer, getDisabilitiesFromServer, addClientToServer } from "../../utils/Utilities";
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import FormHeader from "../../components/FormHeader";
import CheckBox from "../../components/CheckBox";
import DropdownList from "../../components/DropdownList";
import DateInputField from "../../components/DateInputField";
import ImageInputField from "../../components/ImageInputField";
import NewClientSurvey from "../../containers/NewClientSurvey";
import NumberInputField from "../../components/NumberInputField";
import ServerConfig from "../../config/ServerConfig";
import Spinner from 'react-bootstrap/Spinner';
import TextInputField from "../../components/TextInputField";
import TextAreaInputField from "../../components/TextAreaInputField";
import "./style.css";


const imageUploaderSecondaryText = "PNG, jpg, gif files up to 10 MB in size";

const NewClientForm = () => {
    const history = useHistory();
    const [formInputs, setFormInputs] = useState({
        "cbrWorkerId": getWorkerIdFromToken(getToken()),
        "doConsentToInterview": false,
        "isCaregiverPresent": false,
        "doConsentToPhotograph": false,
        "zone": 1,
        "villageNumber": "",
        "birthdate": "",
        "firstName": "",
        "lastName": "",
        "gender": "F",
        "contactNumber": "",
        "caregiverName": "",
        "caregiverNumber": "",
        "disabilityType": [],
        "Other": false,
        "otherDesc": "",
        "healthRisk": "low",
        "healthNeed": "",
        "healthIndividualGoals": "",
        "socialRisk": "low",
        "socialNeed": "",
        "socialIndividualGoals": "",
        "educationRisk": "low",
        "educationNeed": "",
        "educationIndividualGoals": "",
        "clientPhoto": null,
        "caregiverPhoto": null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
    const [isFormInputDisabled, setIsFormInputDisabled] = useState(true);
    const [isPhotographDisabled, setIsPhotographDisabled] = useState(true);
    const [isCaregiverPresent, setIsCaregiverPresent] = useState(false);
    const [showHealthSurvey, setShowHealthSurvey] = useState(true);
    const [showSocialSurvey, setShowSocialSurvey] = useState(true);
    const [showEducationSurvey, setShowEducationSurvey] = useState(true);
    const [errorMessages, setErrorMessages] = useState([]);
    const [dateStr, setDateStr] = useState("");
    

    // input type file is an uncontrolled component so we need to use reference
    const refClientPhotoInput = useRef(null);
    const refCaregiverPhotoInput = useRef(null);

    const [zoneList, setZoneList] = useState({});
    const [disabilityList, setDisabilityList] = useState({});

    const reqInputNameAndDisplayNames = {
        "zone": "Client zone",
        "firstName": "First Name",
        "lastName": "Last Name",
    };

    const onSubmitSurveyHandler = event => {
        event.preventDefault();
        clearErrorMessages();
        // Currently the database only has single column for individual goals and required services
        // Therefore, we need to combine health, social and educational together for now.
        // TODO: remove this after back-end implemented three different columns for health, social and educational
        const goalsAndServices = {};
        goalsAndServices["individualGoals"] = 
            formInputs["healthIndividualGoals"] + 
            formInputs["socialIndividualGoals"] + 
            formInputs["educationIndividualGoals"];

        goalsAndServices["requiredServices"] = 
            formInputs["healthNeed"] +
            formInputs["socialNeed"] +
            formInputs["educationNeed"];

        // We do not set state here because setState is asynchronous.
        // State may not be updated when we submit the form.
        const sendingData = { ...formInputs, ...goalsAndServices };
        sendingData["clientPhoto"] = getReferenceFile(refClientPhotoInput);
        sendingData["caregiverPhoto"] = getReferenceFile(refCaregiverPhotoInput);

        const unfilledReqInputDisplayNames = getUnfilledInputDisplayNames(reqInputNameAndDisplayNames);
        if (unfilledReqInputDisplayNames.length !== 0) {
            setRequiredInputErrorMessages(unfilledReqInputDisplayNames);
            return;
        }
        submitFormByPostRequest(sendingData);
    };

    const getUnfilledInputDisplayNames = inputNameAndDisplayNames => {
        const unfilledInputDisplayNames = [];
        for (const inputName in inputNameAndDisplayNames) {
            const input = formInputs[inputName];
            if (isInputEmpty(input)) {
                const displayName = inputNameAndDisplayNames[inputName];
                unfilledInputDisplayNames.push(displayName);
            }
        }
        return unfilledInputDisplayNames;
    };

    const isInputEmpty = input => {
        return input.length === 0 || input === "" || input === null;
    };

    const setRequiredInputErrorMessages = requiredInputDisplayNames => {
        const requiredErrorMessages = [];
        for (const idx in requiredInputDisplayNames) {
            const displayName = requiredInputDisplayNames[idx];
            requiredErrorMessages.push(displayName + " is required.");
        }
        setErrorMessages(prevErrorMessages => {
            const newErrorMessages = [...prevErrorMessages, ...requiredErrorMessages];
            return newErrorMessages;
        });
    };

    const clearErrorMessages = () => {
        setErrorMessages([]);
    };

    const getReferenceFile = ref => {
        return ref.current.files[0];
    };

    const getDisabilities = () => {
        const requestHeader = {
            token: getToken()
        };
        getDisabilitiesFromServer(requestHeader)
        .then(response => {
            setDisabilityList(response.data.data);
        });
    };

    const getDisabilityId = (type) => {
        for (const index in disabilityList) {
            if (disabilityList[index].type === type) {
                return disabilityList[index].id;
            }
        }
    };

    const getZones = () => {
        getZonesFromServer()
        .then(response => {
            setZoneList(response.data.data);
        });
    };

    useEffect(() => {
        getZones();
        getDisabilities();
    }, []);

    const submitFormByPostRequest = data => {
        setStatesWhenFormIsSubmitting(true);
        const requestHeader = {
            token: getToken()
        };
        addClientToServer(data, requestHeader)
        .then(response => {
            setFormStateAfterSubmitSuccess();
            const clientId = response.data.id;
            const oneSecond = 1;
            redirectToClientInfoPageAfter(clientId, oneSecond);
        })
        .catch(error => {
            updateErrorMessages(error);
            setStatesWhenFormIsSubmitting(false);
        })
    };

    const setFormStateAfterSubmitSuccess = () => {
        setIsSubmitSuccess(true);
        setIsSubmitting(false);
    };

    const redirectToClientInfoPageAfter = (clientId, timeInSecond) => {
        const timeInMilliSecond = timeInSecond * 1000;
        setTimeout(() => {
            history.push("/client-information?id=" + clientId);
            window.scrollTo(0, 0);
        }, timeInMilliSecond);
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

    const setStatesWhenFormIsSubmitting = isSubmitting => {
        if (isSubmitting) {
            setIsSubmitting(true);
            setIsFormInputDisabled(true);
        } else {
            setIsSubmitting(false);
            setIsFormInputDisabled(false);
        }
    };

    const getSubmitButtonText = () => {
        if (isSubmitting) {
            return (
                <div className="spinning-submit-button-text">
                    <Spinner
                        className="spinner"
                        as="div"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Submitting
                </div>
            );
        } else {
            return "Submit";
        }
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

    const hasErrorMessages = () => {
        return errorMessages.length !== 0;
    };

    const formInputChangeHandler = event => {
        const input = event.target;
        const name = input.name;
        const value = input.value;
        updateFormInputByNameValue(name, value);
    };

    const dateFormInputChangeHandler = event => {
        const input = event.target;
        const name = input.name;
        const value = getEpochTime(input.value);
        setDateStr(input.value)
        updateFormInputByNameValue(name, value);
    };

    const updateFormInputByNameValue = (name, value) => {
        setFormInputs(prevFormInputs => {
            const newFormInputs = { ...prevFormInputs };
            newFormInputs[name] = value;
            return newFormInputs;
        });
    };

    const doConsentToInterviewCheckBoxActionHandler = event => {
        const checkBox = event.target;
        const doConsentToInterview = checkBox.checked;
        setIsFormInputDisabled(!doConsentToInterview);
        updateFormInputByNameValue("doConsentToInterview", doConsentToInterview);
    };

    const doConsentToPhotographCheckBoxActionHandler = event => {
        const checkBox = event.target;
        const doConsentToPhotograph = checkBox.checked;
        setIsPhotographDisabled(!doConsentToPhotograph);
        updateFormInputByNameValue("doConsentToPhotograph", doConsentToPhotograph);
    };

    const isCaregiverPresentCheckBoxActionHandler = event => {
        const checkBox = event.target;
        const isCaregiverPresent = checkBox.checked;
        setIsCaregiverPresent(isCaregiverPresent);
        updateFormInputByNameValue("isCaregiverPresent", isCaregiverPresent);
    };

    const isCaregiverRelatedInputDisabled = () => {
        return isFormInputDisabled || !isCaregiverPresent;
    };

    const isClientPhotographDisabled = () => {
        return isFormInputDisabled || isPhotographDisabled;
    };

    const isCaregiverPhotographDisabled = () => {
        return isCaregiverRelatedInputDisabled() || isPhotographDisabled;
    };

    const getToggleShowHideHandler = setShowHideStateHook => {
        return event => {
            setShowHideStateHook(prevState => !prevState);
        };
    };

    const shouldShowBlockElement = shouldShow => {
        return shouldShow ? "block" : "none";
    };

    const getShowHideSymbol = isShow => {
        return isShow ? "-" : "+";
    };

    const getEpochTime = date => {
        const dateTime = new Date(date).getTime();
        return dateTime;
    }

    const getDisabilityTypeCheckBoxesOnChangeHandler = type => {
        return event => {
            updateDisabilityList(event);
        };
    };

    const removeCheckBoxValuesByName = (checkBoxesValues, name) => {
        const matchedItemIndex = checkBoxesValues.indexOf(getDisabilityId(name));
        if (matchedItemIndex !== -1) {
            checkBoxesValues.splice(matchedItemIndex, 1);
        }
    };

    const createDisabilityCheckboxComponents = () => {
        const disabilityCheckboxComponents = [];
        if(disabilityList === undefined || disabilityList.length === 0) {
            return null;
        }
        else {
            for (const index in disabilityList) {
                const type = disabilityList[index].type;
                const id = disabilityList[index].id;
                if(type != "Other"){
                    disabilityCheckboxComponents.push(<CheckBox
                                                            name={type}
                                                            value={id}
                                                            actionHandler={getDisabilityTypeCheckBoxesOnChangeHandler(type)}
                                                            isDisabled={isFormInputDisabled}
                                                            displayText={type}
                                                            displayTextOnRight={true}
                                                            key={index}
                                                    />
                                                    );
                }
            }
            return disabilityCheckboxComponents;
        }
    };

    const handleOther = type => {
        return event => {
            updateFormInputByNameValue(event.target.name,event.target.checked)
            updateDisabilityList(event);
        };
    }

    const updateDisabilityList = event => {
        const checkBox = event.target;
        let checkBoxesValues = formInputs["disabilityType"];
        if (checkBox.checked) {
            checkBoxesValues = [...checkBoxesValues, getDisabilityId(event.target.name)];
        } else {
            removeCheckBoxValuesByName(checkBoxesValues, event.target.name);
        }
        updateFormInputByNameValue("disabilityType", checkBoxesValues);
    }

    return (
        <div className="new-client-form">
            <FormHeader
                headerText="New Client - Client Information"
            />

            <div className="form-body">
                <div className="input-field-container">
                    <CheckBox
                        name="doConsentToInterview"
                        value={formInputs["doConsentToInterview"]}
                        actionHandler={doConsentToInterviewCheckBoxActionHandler}
                        displayText={"Do you consent to the interview?"}
                    />
                </div>

                <hr />

                <div className="input-field-container">
                    <div className="label-container">
                        <label>Location:</label>
                    </div>
                    <DropdownList
                        dropdownName="zone"
                        value={formInputs["zone"]}
                        dropdownListItemsKeyValue={zoneList}
                        onChange={formInputChangeHandler}
                        isDisabled={isFormInputDisabled}
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
                        isDisabled={isFormInputDisabled}
                    />
                </div>

                <div className="input-field-container">
                    <div className="label-container">
                        <label>Birth Date:</label>
                    </div>
                    <DateInputField
                        name="birthdate"
                        value={dateStr}
                        onChange={dateFormInputChangeHandler}
                        isDisabled={isFormInputDisabled}
                    />
                </div>

                <div className="input-field-container">
                    <div className="label-container">
                        <label>First Name:</label>
                    </div>
                    <TextInputField
                        name="firstName"
                        value={formInputs["firstName"]}
                        onChange={formInputChangeHandler}
                        isDisabled={isFormInputDisabled}
                    />
                </div>

                <div className="input-field-container">
                    <div className="label-container">
                        <label>Last Name:</label>
                    </div>
                    <TextInputField
                        name="lastName"
                        value={formInputs["lastName"]}
                        onChange={formInputChangeHandler}
                        isDisabled={isFormInputDisabled}
                    />
                </div>

                <div className="input-field-container">
                    <div className="label-container">
                        <label>Gender:</label>
                    </div>
                    <DropdownList
                        dropdownName="gender"
                        value={formInputs["gender"]}
                        dropdownListItemsKeyValue={{
                            "Female": "F",
                            "Male": "M"
                        }}
                        onChange={formInputChangeHandler}
                        isDisabled={isFormInputDisabled}
                    />
                </div>

                <div className="input-field-container">
                    <div className="label-container">
                        <label>Contact Number:</label>
                    </div>
                    <NumberInputField
                        name="contactNumber"
                        value={formInputs["contactNumber"]}
                        onChange={formInputChangeHandler}
                        isDisabled={isFormInputDisabled}
                    />
                </div>

                <hr />

                <div className="input-field-container">
                    <CheckBox
                        name="isCaregiverPresent"
                        value={formInputs["isCaregiverPresent"]}
                        actionHandler={isCaregiverPresentCheckBoxActionHandler}
                        displayText={"Is the Caregiver present?"}
                        isDisabled={isFormInputDisabled}
                    />
                </div>

                <div className="input-field-container">
                    <div className="label-container">
                        <label>Caregiver Name:</label>
                    </div>
                    <TextInputField
                        name="caregiverName"
                        value={formInputs["caregiverName"]}
                        onChange={formInputChangeHandler}
                        isDisabled={isCaregiverRelatedInputDisabled()}
                    />
                </div>

                <div className="input-field-container">
                    <div className="label-container">
                        <label>Caregiver Number:</label>
                    </div>
                    <NumberInputField
                        name="caregiverNumber"
                        value={formInputs["caregiverNumber"]}
                        onChange={formInputChangeHandler}
                        isDisabled={isCaregiverRelatedInputDisabled()}
                    />
                </div>

                <hr />

                <div className="input-field-container">
                    <CheckBox
                        name="doConsentToPhotograph"
                        value={formInputs["doConsentToPhotograph"]}
                        actionHandler={doConsentToPhotographCheckBoxActionHandler}
                        displayText={"Do you consent to a photograph?"}
                        isDisabled={isFormInputDisabled}
                    />
                </div>

                <div className="input-field-container">
                    <ImageInputField
                        id="client-photo-input"
                        primaryText="Select a photo for CLIENT"
                        secondaryText={imageUploaderSecondaryText}
                        isDisabled={isClientPhotographDisabled()}
                        reference={refClientPhotoInput}
                    />
                </div>

                <div className="input-field-container">
                    <ImageInputField
                        id="caregiver-photo-input"
                        primaryText="Select a photo for CAREGIVER"
                        secondaryText={imageUploaderSecondaryText}
                        isDisabled={isCaregiverPhotographDisabled()}
                        reference={refCaregiverPhotoInput}
                    />
                </div>

                <hr />

                <div className="input-field-container">
                    <div className="label-container">
                        <label>Disability Type:</label>
                    </div>
                    {createDisabilityCheckboxComponents()}
                    <CheckBox
                        name="Other"
                        value={formInputs["Other"]}
                        actionHandler={handleOther("Other")}
                        displayText={"Other"}
                        isDisabled={isFormInputDisabled}
                        displayTextOnRight={true}
                    />
                    <div hidden={!formInputs["Other"]}>
                        <TextAreaInputField
                            name="otherDesc"
                            value={formInputs["otherDesc"]}
                            onChange={(e) => {updateFormInputByNameValue(e.target.name,e.target.value)}}
                            rows="4"
                            isDisabled={false}
                        />
                    </div>
                </div>

                <hr />

                <div className="input-field-container">
                    <div className="label-container show-hide-toggle-title" onClick={getToggleShowHideHandler(setShowHealthSurvey)}>
                        <label>{getShowHideSymbol(showHealthSurvey)} Health Risk Survey</label>
                    </div>
                    <div className="show-hide-toggle-content" style={{ display: shouldShowBlockElement(showHealthSurvey) }}>
                        <NewClientSurvey
                            riskInputName="healthRisk"
                            needInputName="healthNeed"
                            individualGoalsInputName="healthIndividualGoals"
                            riskValue={formInputs["healthRisk"]}
                            needInputValue={formInputs["healthNeed"]}
                            individualGoalsValue={formInputs["healthIndividualGoals"]}
                            onChange={formInputChangeHandler}
                            isDisabled={isFormInputDisabled}
                        />
                    </div>
                </div>

                <hr />

                <div className="input-field-container">
                    <div className="label-container show-hide-toggle-title" onClick={getToggleShowHideHandler(setShowSocialSurvey)}>
                        <label>{getShowHideSymbol(showSocialSurvey)} Social Risk Survey</label>
                    </div>
                    <div className="show-hide-toggle-content" style={{ display: shouldShowBlockElement(showSocialSurvey) }}>
                        <NewClientSurvey
                            riskInputName="socialRisk"
                            needInputName="socialNeed"
                            individualGoalsInputName="socialIndividualGoals"
                            riskValue={formInputs["socialRisk"]}
                            needInputValue={formInputs["socialNeed"]}
                            individualGoalsValue={formInputs["socialIndividualGoals"]}
                            onChange={formInputChangeHandler}
                            isDisabled={isFormInputDisabled}
                        />
                    </div>
                </div>

                <hr />

                <div className="input-field-container">
                    <div className="label-container show-hide-toggle-title" onClick={getToggleShowHideHandler(setShowEducationSurvey)}>
                        <label>{getShowHideSymbol(showEducationSurvey)} Education Risk Survey</label>
                    </div>
                    <div className="show-hide-toggle-content" style={{ display: shouldShowBlockElement(showEducationSurvey) }}>
                        <NewClientSurvey
                            riskInputName="educationRisk"
                            needInputName="educationNeed"
                            individualGoalsInputName="educationIndividualGoals"
                            riskValue={formInputs["educationRisk"]}
                            needInputValue={formInputs["educationNeed"]}
                            individualGoalsValue={formInputs["educationIndividualGoals"]}
                            onChange={formInputChangeHandler}
                            isDisabled={isFormInputDisabled}
                        />
                    </div>
                </div>

                <hr />

                {showErrorMessages()}
                {showSuccessMessage()}

                <Button
                    variant="primary"
                    size="lg"
                    disabled={isFormInputDisabled}
                    onClick={onSubmitSurveyHandler}
                >
                    {getSubmitButtonText()}
                </Button>
            </div>
        </div >
    );
};

export default NewClientForm;
