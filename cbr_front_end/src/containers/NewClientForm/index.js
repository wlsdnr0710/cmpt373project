import React, { useRef, useState } from "react";
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
import TextInputField from "../../components/TextInputField";
import "./style.css";

// TODO: We want to fetch zones from backend server instead of hardcoding them here.
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

const imageUploaderSecondaryText = "PNG, jpg, gif files up to 10 MB in size";

const NewClientForm = () => {
    const [formInputs, setFormInputs] = useState({
        "doConsentToInterview": false,
        "isCaregiverPresent": false,
        "doConsentToPhotograph": false,
        "clientZone": "bidizone1",
        "villageNumber": "",
        "birthdate": "",
        "firstName": "",
        "lastName": "",
        "clientGender": "female",
        "contactNumber": "",
        "caregiverNumber": "",
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
    const [isFormInputDisabled, setIsFormInputDisabled] = useState(true);
    const [isPhotographDisabled, setIsPhotographDisabled] = useState(true);
    const [isCaregivenPresent, setIsCaregivenPresent] = useState(false);
    const [showHealthSurvey, setShowHealthSurvey] = useState(true);
    const [showSocialSurvey, setShowSocialSurvey] = useState(true);
    const [showEducationSurvey, setShowEducationSurvey] = useState(true);
    const [errorMessages, setErrorMessages] = useState([]);

    // input type file is an uncontrolled component so we need to use reference
    const refClientPhotoInput = useRef(null);
    const refCaregiverPhotoInput = useRef(null);


    const reqInputNameAndDisplayNames = {
        "clientZone": "Client zone",
        "firstName": "First Name",
        "lastName": "Last Name",
    };

    const onSubmitSurveyHandler = event => {
        event.preventDefault();
        clearErrorMessages();
        // We do not set state here because setState is asynchronous.
        // State may not be updated when we submit the form.
        const sendingData = {...formInputs};
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
        axios.post('/api/v1/client', {
            "data": data
        })
        .then(response => {

        })
        .catch(error => {
            setErrorMessages(prevErrorMessages => {
                const message = error.message;
                const newMessages = [...prevErrorMessages, message];
                return newMessages;
            });
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

    const hasErrorMessages = () => {
        return errorMessages.length !== 0;
    };

    const formInputChangeHandler = event => {
        const input = event.target;
        const name = input.name;
        const value = input.value;
        updateFormInputByNameValue(name, value);
    };

    const updateFormInputByNameValue = (name, value) => {
        setFormInputs(prevFormInputs => {
            const newFormInputs = {...prevFormInputs};
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
        setIsCaregivenPresent(isCaregiverPresent);
        updateFormInputByNameValue("isCaregiverPresent", isCaregiverPresent);
    };

    const isCaregiverRelatedInputDisabled = () => {
        return isFormInputDisabled || !isCaregivenPresent;
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
                        dropdownName="clientZone"
                        value={formInputs["clientZone"]}
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
                        value={formInputs["birthdate"]} 
                        onChange={formInputChangeHandler} 
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
                        dropdownName="clientGender"
                        value={formInputs["clientGender"]}
                        dropdownListItemsKeyValue={{
                            "Female": "female", 
                            "Male": "male"
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

                <hr/>

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
                        <label>Caregiver Number:</label>
                    </div>
                    <NumberInputField
                        name="caregiverNumber"
                        value={formInputs["caregiverNumber"]} 
                        onChange={formInputChangeHandler} 
                        isDisabled={isCaregiverRelatedInputDisabled()} 
                    />
                </div>

                <hr/>

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

                <hr/>

                <div className="input-field-container">
                    <div className="label-container show-hide-toggle-title" onClick={getToggleShowHideHandler(setShowHealthSurvey)}>
                        <label>{getShowHideSymbol(showHealthSurvey)} Health Risk Survey</label>
                    </div>
                    <div className="show-hide-toggle-content" style={{display: shouldShowBlockElement(showHealthSurvey)}}>
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

                <hr/>

                <div className="input-field-container">
                    <div className="label-container show-hide-toggle-title" onClick={getToggleShowHideHandler(setShowSocialSurvey)}>
                        <label>{getShowHideSymbol(showSocialSurvey)} Social Risk Survey</label>
                    </div>
                    <div className="show-hide-toggle-content" style={{display: shouldShowBlockElement(showSocialSurvey)}}>
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

                <hr/>

                <div className="input-field-container">
                    <div className="label-container show-hide-toggle-title" onClick={getToggleShowHideHandler(setShowEducationSurvey)}>
                        <label>{getShowHideSymbol(showEducationSurvey)} Education Risk Survey</label>
                    </div>
                    <div className="show-hide-toggle-content" style={{display: shouldShowBlockElement(showEducationSurvey)}}>
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

                <hr/>

                {showErrorMessages()}

                <Button 
                    variant="primary" 
                    size="lg" 
                    disabled={isFormInputDisabled}
                    onClick={onSubmitSurveyHandler}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default NewClientForm;
