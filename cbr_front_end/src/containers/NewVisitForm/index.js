import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FormHeader from "../../components/FormHeader";
import DropdownList from "../../components/DropdownList";
import CheckBox from "../../components/CheckBox";
import axios from 'axios';
import Logo from "../../assets/HHALogo.svg";
import "./style.css";

// TODO: We want to fetch zones from backend server instead of hardcoding them here.
const defaultPurpose = {
    "CBR": "cbr",
    "Disability centre referral": "referral",
    "Disability centre follow up": "followUp",
};


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
    const [formInputs, setFormInputs] = useState({
        "purposeForVisit": "cbr",
        "doHealthCheckBox": false,
        "doEducationCheckBox": false,
        "doSocialCheckBox": false,
        "clientZone": "bidizone1",

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

    const doEducationCheckBoxActionHandler = event => {
        const checkBox = event.target;
        const doEducationCheckBox = checkBox.checked;
        updateFormInputByNameValue("doEducationCheckBox", doEducationCheckBox);
    };

    const doSocialCheckBoxActionHandler = event => {
        const checkBox = event.target;
        const doSocialCheckBox = checkBox.checked;
        updateFormInputByNameValue("doSocialCheckBox", doSocialCheckBox);
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
                        dropdownListItemsKeyValue={defaultPurpose}
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
                    <CheckBox
                        name="doEducationCheckBox"
                        value={formInputs["doEducationCheckBox"]}
                        actionHandler={doEducationCheckBoxActionHandler}
                        displayText={"Education"}
                        isHidden={false}
                    />
                    <CheckBox
                        name="doSocialCheckBox"
                        value={formInputs["doSocialCheckBox"]}
                        actionHandler={doSocialCheckBoxActionHandler}
                        displayText={"Social"}
                        isHidden={false}
                    />
                </div>
                <hr />
                <div>
                    <label>Date of Visit:</label>
                </div>
                <div>
                    <label>Name of CBR worker:</label>
                </div>
                <div>
                    <label>Location of Visit(GPS)</label>
                </div>
                <div>
                    <div>
                        <label>Location</label>
                    </div>
                    <DropdownList
                        dropdownName="clientZone"
                        value={formInputs["clientZone"]}
                        dropdownListItemsKeyValue={defaultClientZones}
                        onChange={formInputChangeHandler}
                        isDisabled={isFormInputDisabled}
                    />
                </div>
                <div>
                    <label>Village No:</label>
                </div>
                <div>
                    <label>For Health what was provided?</label>
                </div>
                <div>
                    <label>Goal met?:</label>
                </div>
                <div>
                    <label>(if goal met = concluded) what was the outcome?</label>
                </div>
                <div>
                    <label>For education what was provided?</label>
                </div>
                <div>
                    <label>Goal met?:</label>
                </div>
                <div>
                    <label>(if goal met = concluded) what was the outcome?</label>
                </div>
                <div>
                    <label>For social what was provided?</label>
                </div>
                <div>
                    <label>Goal met?:</label>
                </div>
                <div>
                    <label>(if goal met = concluded) what was the outcome?</label>
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