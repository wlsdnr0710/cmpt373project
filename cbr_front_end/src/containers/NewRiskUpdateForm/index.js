import React, { useState, useCallback, useEffect } from "react";
import TextInputField from "../../components/TextInputField";
import NumberInputField from "../../components/NumberInputField";
import {
    addRiskToServer
} from "../../utils/Utilities";

    const NewRiskUpdateForm = props => {
    //    const clientId = props.clientID;


    const [formInputs, setFormInputs] = useState({
        //"clientId": clientId,
        "createdDate": "",
        "healthGoal": "",
        "healthRisk": "",
        "healthRiskDescription": "",
        "educationGoal": "",
        "educationRisk": "",
        "educationRiskDescription": "",
        "socialGoal": "",
        "socialRisk": "",
        "socialRiskDescription": "",

    });

    const [errorMessages, setErrorMessages] = useState([]);

    const formInputChangeHandler = event => {
        const input = event.target;
        const name = input.name;
        const value = input.value;
        updateFormInputByNameValue(name, value);
    };


    const clearErrorMessages = () => {
        setErrorMessages([]);
    };

    const onSubmitRiskHandler = event => {
        let submittedForm = formInputs;
        event.preventDefault();
        clearErrorMessages();
        }

    const updateFormInputByNameValue = (name, value) => {
        setFormInputs(prevFormInputs => {
            const newFormInputs = { ...prevFormInputs };
            newFormInputs[name] = value;
            return newFormInputs;
        });
    };

    const submitFormByPostRequest = data => {
        setStatesWhenFormIsSubmitting(true);
        const requestHeader = {
            token: getToken()
        };
        addRiskToServer(data, requestHeader)
        .then(response => {
            setFormStateAfterSubmitSuccess();
            const clientId = props.clientID;
            const oneSecond = 1;
                redirectToClientInfoPageAfter(clientId, oneSecond);
        })
        .catch(error => {

            updateErrorMessages(error);
            setStatesWhenFormIsSubmitting(false);
        })
    };

        return (
            <form className="">
                <div className="input-field-container">
                    <div className="label-container">
                        <label>Health Risk:</label>
                    </div>
                    <NumberInputField
                        name="healthRisk"
                        value={formInputs["healthRisk"]}
                        onChange={formInputChangeHandler}
                    />
                </div>
                <div className="input-field-container">
                    <div className="label-container">
                        <label>Health Risk Description:</label>
                    </div>
                    <TextInputField
                        name="healthRiskDescription"
                        value={formInputs["healthRiskDescription"]}
                        onChange={formInputChangeHandler}
                    />
                </div>
                <div className="input-field-container">
                    <div className="label-container">
                        <label>Health Goal:</label>
                    </div>
                    <TextInputField
                        name="healthGoal"
                        value={formInputs["healthGoal"]}
                        onChange={formInputChangeHandler}
                    />
                </div>
                <div className="input-field-container">
                    <div className="label-container">
                        <label>Education Risk:</label>
                    </div>
                    <NumberInputField
                        name="educationRisk"
                        value={formInputs["educationRisk"]}
                        onChange={formInputChangeHandler}
                    />
                </div>
                <div className="input-field-container">
                    <div className="label-container">
                        <label>Education Risk Description:</label>
                    </div>
                    <TextInputField
                        name="educationRiskDescription"
                        value={formInputs["educationRiskDescription"]}
                        onChange={formInputChangeHandler}
                    />
                </div>
                <div className="input-field-container">
                    <div className="label-container">
                        <label>Education Goal:</label>
                    </div>
                    <TextInputField
                        name="educationGoal"
                        value={formInputs["educationGoal"]}
                        onChange={formInputChangeHandler}
                    />
                </div>
                <div className="input-field-container">
                    <div className="label-container">
                        <label>Social Risk:</label>
                    </div>
                    <NumberInputField
                        name="socialRisk"
                        value={formInputs["socialRisk"]}
                        onChange={formInputChangeHandler}
                    />
                </div>
                <div className="input-field-container">
                    <div className="label-container">
                        <label>Social Risk Description:</label>
                    </div>
                    <TextInputField
                        name="socialRiskDescription"
                        value={formInputs["socialRiskDescription"]}
                        onChange={formInputChangeHandler}
                    />
                </div>
                <div className="input-field-container">
                    <div className="label-container">
                        <label>Social Goal:</label>
                    </div>
                    <TextInputField
                        name="socialGoal"
                        value={formInputs["socialGoal"]}
                        onChange={formInputChangeHandler}
                    />
                </div>
                <hr />
                    <input
                        className="btn btn-secondary update-risk-button"
                        type="button"
                        value="Update Risk"
                        onClick={onSubmitRiskHandler}
                    />
                </form>



        );
    };


export default NewRiskUpdateForm;