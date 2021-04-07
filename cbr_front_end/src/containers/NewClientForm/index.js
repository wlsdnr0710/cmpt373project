import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { getToken } from "../../utils/AuthenticationUtil";
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import DisabilityTypeCheckBoxes from "../DisabilityTypeCheckBoxes";
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
import "./style.css";

// TODO: We want to fetch zones from backend server instead of hardcoding them here.
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

const imageUploaderSecondaryText = "PNG, jpg, gif files up to 10 MB in size";

const NewClientForm = () => {
    const history = useHistory();
const [formInputs, setFormInputs] = useState({
        "cbrWorkerId": 1, //TODO: Replace this when login is implemented
        "doConsentToInterview": false,
        "isCaregiverPresent": false,
        "doConsentToPhotograph": false,
        "zone": "1",
        "villageNumber": "",
        "birthdate": "",
        "firstName": "",
        "lastName": "",
        "gender": "F",
        "contactNumber": "",
        "caregiverName": "",
        "caregiverNumber": "",
        "disabilityType": [],
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

    const submitFormByPostRequest = data => {
        setStatesWhenFormIsSubmitting(true);
        
        const requestHeader = {
            token: getToken()
        };
        axios.post(ServerConfig.api.url + '/api/v1/client', {
            "data": data
        }, {
            headers: requestHeader,
        })
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
    
    const disabilityTypeKeyValues = {
        "Amputee": "1",
        "Polio": "2",
        "Spinal Cord Injury": "3",
        "Cerebral Palsy": "4",
        "Spina Bifida": "5",
        "Hydrocephalus": "6",
        "Other": "7",
    };
    const getDisabilityTypeCheckBoxesOnChangeHandler = name => {
        return event => {
            const checkBox = event.target;
            let checkBoxesValues = formInputs["disabilityType"];
            if (checkBox.checked) {
                checkBoxesValues = [...checkBoxesValues, disabilityTypeKeyValues[name]];
            } else {
                removeCheckBoxValuesByName(checkBoxesValues, name);
            }
            updateFormInputByNameValue("disabilityType", checkBoxesValues);
        };
    };

    const removeCheckBoxValuesByName = (checkBoxesValues, name) => {
        const matchedItemIndex = checkBoxesValues.indexOf(disabilityTypeKeyValues[name]);
        if (matchedItemIndex !== -1) {
            checkBoxesValues.splice(matchedItemIndex, 1);
        }
    };

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
                        dropdownListItemsKeyValue={defaultClientZones}
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
                    <DisabilityTypeCheckBoxes 
                        values={formInputs["disabilityType"]}
                        getOnChangeHandlers={getDisabilityTypeCheckBoxesOnChangeHandler}
                        isDisabled={isFormInputDisabled}
                    />
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
