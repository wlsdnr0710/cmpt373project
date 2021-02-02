import React, { useState } from "react";
import FormHeader from "../../components/FormHeader";
import CheckBox from "../../components/CheckBox";
import DropdownList from "../../components/DropdownList";
import DateInputField from "../../components/DateInputField";
import NumberInputField from "../../components/NumberInputField";
import TextInputField from "../../components/TextInputField";
import "./style.css"

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

const NewClientForm = () => {
    const [isFormInputDisabled, setIsFormInputDisabled] = useState(false);
    const [isCaregivenPresent, setIsCaregivenPresent] = useState(false);

    const consentToInterviewCheckBoxActionHandler = event => {
        const checkBox = event.target;
        if (checkBox.checked) {
            setIsFormInputDisabled(true);;
        } else {
            setIsFormInputDisabled(false);
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
                    />
                </div>

                <div className="input-field-container">
                    <div className="label-container">
                        <label>Village Number:</label>
                    </div>
                    <NumberInputField />
                </div>

                <div className="input-field-container">
                    <div className="label-container">
                        <label>Date:</label>
                    </div>
                    <DateInputField />
                </div>

                <div className="input-field-container">
                    <div className="label-container">
                        <label>First Name:</label>
                    </div>
                    <TextInputField />
                </div>

                <div className="input-field-container">
                    <div className="label-container">
                        <label>Last Name:</label>
                    </div>
                    <TextInputField />
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
                    />
                </div>

                <div className="input-field-container">
                    <div className="label-container">
                        <label>Age:</label>
                    </div>
                    <NumberInputField min={0} max={200} />
                </div>

                <div className="input-field-container">
                    <div className="label-container">
                        <label>Contact Number:</label>
                    </div>
                    <NumberInputField />
                </div>

                <hr/>

                <div className="input-field-container">
                    <CheckBox 
                        actionHandler={isCaregiverPresentCheckBoxActionHandler}
                        displayText={"Is the Caregiver present?"}
                    />
                </div>

                <div className="input-field-container">
                    <div className="label-container">
                        <label>Caregiver Number:</label>
                    </div>
                    <NumberInputField />
                </div>

                <hr/>

            </div>
        </div>
    );
};

export default NewClientForm;
