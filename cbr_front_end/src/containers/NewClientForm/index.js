import React, { useState } from "react";
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
        "clientZone": "bidizone1",
        "villageNumber": "",
        "date": "",
        "firstName": "",
        "lastName": "",
        "clientGender": "female",
        "age": "",
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
    });
    const [isFormInputDisabled, setIsFormInputDisabled] = useState(true);
    const [isPhotographDisabled, setIsPhotographDisabled] = useState(true);
    const [isCaregivenPresent, setIsCaregivenPresent] = useState(false);
    const [showHealthSurvey, setShowHealthSurvey] = useState(true);
    const [showSocialSurvey, setShowSocialSurvey] = useState(true);
    const [showEducationSurvey, setShowEducationSurvey] = useState(true);


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
            console.log(newFormInputs);
            return newFormInputs;
        });
    };

    const consentToInterviewCheckBoxActionHandler = event => {
        const checkBox = event.target;
        if (checkBox.checked) {
            setIsFormInputDisabled(false);;
        } else {
            setIsFormInputDisabled(true);
        }
    };

    const consentToPhotographCheckBoxActionHandler = event => {
        const checkBox = event.target;
        if (checkBox.checked) {
            setIsPhotographDisabled(false);;
        } else {
            setIsPhotographDisabled(true);
        }
    };

    const isCaregiverPresentCheckBoxActionHandler = event => {
        const checkBox = event.target;
        if (checkBox.checked) {
            setIsCaregivenPresent(true);
        } else {
            setIsCaregivenPresent(false);
        }
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
                        actionHandler={consentToInterviewCheckBoxActionHandler}
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
                        <label>Date:</label>
                    </div>
                    <DateInputField name="date" value={formInputs["date"]} onChange={formInputChangeHandler} isDisabled={isFormInputDisabled} />
                </div>

                <div className="input-field-container">
                    <div className="label-container">
                        <label>First Name:</label>
                    </div>
                    <TextInputField name="firstName" value={formInputs["firstName"]} onChange={formInputChangeHandler} isDisabled={isFormInputDisabled} />
                </div>

                <div className="input-field-container">
                    <div className="label-container">
                        <label>Last Name:</label>
                    </div>
                    <TextInputField name="lastName" value={formInputs["lastName"]} onChange={formInputChangeHandler} isDisabled={isFormInputDisabled} />
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
                        <label>Age:</label>
                    </div>
                    <NumberInputField 
                        min={0} 
                        max={200} 
                        name="age"
                        value={formInputs["age"]}
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
                        actionHandler={consentToPhotographCheckBoxActionHandler}
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
                    />
                </div>

                <div className="input-field-container">
                    <ImageInputField 
                        id="caregiver-photo-input"
                        primaryText="Select a photo for CAREGIVER"
                        secondaryText={imageUploaderSecondaryText}
                        isDisabled={isCaregiverPhotographDisabled()}
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
                        />
                    </div>
                </div>

                <hr/>

                <Button variant="primary" size="lg" disabled={isFormInputDisabled}>
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default NewClientForm;
