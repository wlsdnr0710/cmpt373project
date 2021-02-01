import React from "react";
import FormHeader from "../../components/FormHeader";
import CheckBox from "../../components/CheckBox";
import "./style.css"

const consentToInterviewSwitchActionHandler = event => {
    const toggleSwitch = event.target;
    if (toggleSwitch.checked) {
        enableFormInput();
    } else {
        disableFormInput();
    }
};

const disableFormInput = () => {
    console.log("disable")
};

const enableFormInput = () => {
    console.log("enable")
};

const NewClientForm = () => {
    return (
        <div className="new-client-form">
            <FormHeader 
                headerText="New Client - Client Information"
            />
            <CheckBox 
                actionHandler={consentToInterviewSwitchActionHandler}
                displayText={"Do you consent to the interview?"}
            />
        </div>
    );
};

export default NewClientForm;
