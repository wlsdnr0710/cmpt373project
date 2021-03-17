import React, { useState } from "react";
import FormHeader from "../../components/FormHeader";
import TextInputField from "../../components/TextInputField";
import { getDefaultNewSurveyObject } from "../../utils/Utilities";
import "./style.css";

const NewSurveyForm = () => {
    const [formInputs, setFormInputs] = useState(getDefaultNewSurveyObject());

    return (
        <div className="new-survey-form">
            <FormHeader
                headerText="Create new survey questions"
            />

            <div className="input-field-container">
                <div className="label-container">
                    <label>Survey Name:</label>
                </div>
                <TextInputField 
                    name="name"
                    value={formInputs["name"]}
                    onChange={() => {}}
                    isDisabled={false}
                />
            </div>
        </div>
    );
};

export default NewSurveyForm;
