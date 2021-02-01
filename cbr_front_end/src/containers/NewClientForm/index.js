import React, { useState } from "react";
import FormHeader from "../../components/FormHeader";
import CheckBox from "../../components/CheckBox";
import DropdownList from "../../components/DropdownList";
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

    const consentToInterviewSwitchActionHandler = event => {
        const toggleSwitch = event.target;
        if (toggleSwitch.checked) {
            enableFormInput();
        } else {
            disableFormInput();
        }
    };
    
    const disableFormInput = () => {
        setIsFormInputDisabled(true);
    };
    
    const enableFormInput = () => {
        setIsFormInputDisabled(false);
    };

    return (
        <div className="new-client-form">
            <FormHeader 
                headerText="New Client - Client Information"
            />

            <div className="form-body">
                <div className="input-field-container">
                    <CheckBox 
                        actionHandler={consentToInterviewSwitchActionHandler}
                        displayText={"Do you consent to the interview?"}
                    />
                </div>

                <div className="input-field-container">
                    <DropdownList 
                        dropdownName="client-zones"
                        placeholder="Location"
                        dropdownListItemsKeyValue={defaultClientZones}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewClientForm;
