import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FormHeader from "../../components/FormHeader";
import DropdownList from "../../components/DropdownList";
import CheckBox from "../../components/CheckBox";
import axios from 'axios';
import Logo from "../../assets/HHALogo.svg";
import "./style.css";
const defaultClientZones = {
    "CBR": "cbr",
    "Disability centre referral": "referral",
    "Disability centre follow up": "followUp",
};

const NewVisitForm = () => {
    const [formInputs, setFormInputs] = useState({
        "purposeForVisit": "cbr",
        "doHealthCheckBox": false,

    });
    const [isFormInputDisabled, setIsFormInputDisabled] = useState(false);

    const onSubmitSurveyHandler = event => {
        event.preventDefault();
        // We do not set state here because setState is asynchronous.
        // State may not be updated when we submit the form.
        const sendingData = { ...formInputs };
        submitFormByPostRequest(sendingData);
    };

    const submitFormByPostRequest = data => {
        axios.post('/api/v1/client', {
            "data": data
        })
            .then(response => {

            })
            .catch(error => {

            });
    };


    const formInputChangeHandler = event => {
        const input = event.target;
        const name = input.name;
        const value = input.value;
        updateFormInputByNameValue(name, value);
    };

    const updateFormInputByNameValue = (name, value) => {
        setFormInputs(prevFormInputs => {
            const newFormInputs = { ...prevFormInputs };
            newFormInputs[name] = value;
            return newFormInputs;
        });
    };

    const doHealthCheckBoxActionHandler = event => {
        const checkBox = event.target;
        const doHealthCheckBox = checkBox.checked;
        updateFormInputByNameValue("doHealthCheckBox", doHealthCheckBox);
    };



    return (
        <div className="new-visit-form">
            <FormHeader
                headerText="New Visit - Visit Information"
            />
            <div className="form-body">
                <div className="input-field-container">
                    <div className="label-container">
                        <label>Purpose for Visit:</label>
                    </div>
                    <DropdownList
                        dropdownName="purposeForVisit"
                        value={formInputs["purposeForVisit"]}
                        dropdownListItemsKeyValue={defaultClientZones}
                        onChange={formInputChangeHandler}
                        isDisabled={isFormInputDisabled}
                    />
                    <CheckBox
                        name="doHealthCheckBox"
                        value={formInputs["doHealthCheckBox"]}
                        actionHandler={doHealthCheckBoxActionHandler}
                        displayText={"Health"}
                        isHidden={false}
                    />
                </div>
                <hr />

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

}

export default NewVisitForm;