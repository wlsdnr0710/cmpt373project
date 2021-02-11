import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FormHeader from "../../components/FormHeader";
import DropdownList from "../../components/DropdownList";
import axios from 'axios';
import Logo from "../../assets/HHALogo.svg";
import "./style.css";
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

const NewVisitForm = () => {
    const [isFormInputDisabled, setIsFormInputDisabled] = useState(true);

    const isCBRCheckBoxActionHandler = event => {
        const checkBox = event.target;
        if (checkBox.checked) {
            setIsFormInputDisabled(false);;
        } else {
            setIsFormInputDisabled(true);
        }
    };

    return (
        <div className="new-visit-form">
            <FormHeader
                headerText="New Visit - Visit Information"
            />
            <div className="form-body">
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
                <hr />

                <Button variant="primary" size="lg" disabled={isFormInputDisabled}>
                    Submit
                </Button>
            </div>
        </div>
    );

}

export default NewVisitForm;