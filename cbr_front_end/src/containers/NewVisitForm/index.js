import React, { Component } from 'react';
import FormHeader from "../../components/FormHeader";
import axios from 'axios';
import LoginInputField from "../../components/LoginInputField";
import Logo from "../../assets/HHALogo.svg";
import "./style.css";


const NewVisitForm = () => {
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

                <hr />

                <Button variant="primary" size="lg" disabled={isFormInputDisabled}>
                    Submit
                </Button>
            </div>
        </div>
    );

}

export default NewVisitForm;