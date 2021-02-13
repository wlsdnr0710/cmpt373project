import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FormHeader from "../../components/FormHeader";
import DropdownList from "../../components/DropdownList";
import axios from 'axios';
import Logo from "../../assets/HHALogo.svg";
import "./style.css";
const defaultClientZones = {
    "CBR": "cbr",
    "Disability centre referral": "referral",
    "Disability centre follow up": "followUp",
};

const NewVisitForm = () => {
    const [isFormInputDisabled, setIsFormInputDisabled] = useState(false);

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
                        dropdownName="Purpose for visit"
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