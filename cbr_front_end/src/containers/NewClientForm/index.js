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
    const [isFormInputDisabled, setIsFormInputDisabled] = useState(true);
    const [isPhotographDisabled, setIsPhotographDisabled] = useState(true);
    const [isCaregivenPresent, setIsCaregivenPresent] = useState(false);
    const [showHealthSurvey, setShowHealthSurvey] = useState(true);
    const [showSocialSurvey, setShowSocialSurvey] = useState(true);
    const [showEducationSurvey, setShowEducationSurvey] = useState(true);


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
                        dropdownName="client-zones"
                        dropdownListItemsKeyValue={defaultClientZones}
                        isDisabled={isFormInputDisabled}
                    />
                </div>

                <div className="input-field-container">
                    <div className="label-container">
                        <label>Village Number:</label>
                    </div>
                    <NumberInputField isDisabled={isFormInputDisabled} />
                </div>

                <div className="input-field-container">
                    <div className="label-container">
                        <label>Date:</label>
                    </div>
                    <DateInputField isDisabled={isFormInputDisabled} />
                </div>

                <div className="input-field-container">
                    <div className="label-container">
                        <label>First Name:</label>
                    </div>
                    <TextInputField isDisabled={isFormInputDisabled} />
                </div>

                <div className="input-field-container">
                    <div className="label-container">
                        <label>Last Name:</label>
                    </div>
                    <TextInputField isDisabled={isFormInputDisabled} />
                </div>

                <div className="input-field-container">
                    <div className="label-container">
                        <label>Gender:</label>
                    </div>
                    <DropdownList 
                        dropdownName="client-gender"
                        dropdownListItemsKeyValue={{
                            "Female": "female", 
                            "Male": "male"
                        }}
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
                        isDisabled={isFormInputDisabled} 
                    />
                </div>

                <div className="input-field-container">
                    <div className="label-container">
                        <label>Contact Number:</label>
                    </div>
                    <NumberInputField isDisabled={isFormInputDisabled} />
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
                    <NumberInputField isDisabled={isCaregiverRelatedInputDisabled()} />
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
                        <NewClientSurvey surveyType="health" />
                    </div>
                </div>

                <hr/>

                <div className="input-field-container">
                    <div className="label-container show-hide-toggle-title" onClick={getToggleShowHideHandler(setShowSocialSurvey)}>
                        <label>{getShowHideSymbol(showSocialSurvey)} Social Risk Survey</label>
                    </div>
                    <div className="show-hide-toggle-content" style={{display: shouldShowBlockElement(showSocialSurvey)}}>
                        <NewClientSurvey surveyType="social" />
                    </div>
                </div>

                <hr/>

                <div className="input-field-container">
                    <div className="label-container show-hide-toggle-title" onClick={getToggleShowHideHandler(setShowEducationSurvey)}>
                        <label>{getShowHideSymbol(showEducationSurvey)} Education Risk Survey</label>
                    </div>
                    <div className="show-hide-toggle-content" style={{display: shouldShowBlockElement(showEducationSurvey)}}>
                        <NewClientSurvey surveyType="education" />
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
