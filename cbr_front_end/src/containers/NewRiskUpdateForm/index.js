import React, { useState, useCallback, useEffect } from "react";
import TextInputField from "../../components/TextInputField";
import { useHistory } from "react-router-dom";
import NumberInputField from "../../components/NumberInputField";
import DateInputField from "../../components/DateInputField";
import { getToken } from "../../utils/AuthenticationUtil";

import {
    addRiskToServer,
    getClientInformationFromServer,
    parseEpochToDateString
} from "../../utils/Utilities";

    const NewRiskUpdateForm = props => {
        const clientId = props.clientID;
        const history = useHistory();


    console.log(clientId);
    const [formInputs, setFormInputs] = useState({
        "clientId": props.clientID,
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
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
    const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const setFormStateAfterSubmitSuccess = () => {
        setIsSubmitSuccess(true);
        setIsSubmitting(false);
        setIsDeleteSuccess(false);
    };

    const formInputChangeHandler = event => {
        const input = event.target;
        const name = input.name;
        const value = input.value;
        updateFormInputByNameValue(name, value);
    };

    const setStatesWhenFormIsSubmitting = (isSubmitting) => {
        if (isSubmitting) {
            setIsSubmitting(true);
        } else {
            setIsSubmitting(false);
        }
    };
    const clearErrorMessages = () => {
        setErrorMessages([]);
    };

 useEffect(() => {
        initEpochDateTime();
    }, []);


    const onSubmitRiskHandler = event => {
        event.preventDefault();
        clearErrorMessages();
        let submittedForm = formInputs;
        const sendingData = { ...formInputs };
        console.log(sendingData);
        submitFormByPostRequest(sendingData);
        }



    const updateFormInputByNameValue = (name, value) => {
        setFormInputs(prevFormInputs => {
            const newFormInputs = { ...prevFormInputs };
            newFormInputs[name] = value;
            return newFormInputs;
        });
    };

    const updateErrorMessages = (error) => {
        setErrorMessages((prevErrorMessages) => {
            let messages = ["Something went wrong on the server."];
            if (error.response) {
                messages = error.response.data.messages;
            }
            const newMessages = [...prevErrorMessages, ...messages];
            return newMessages;
        });
    };

    const initEpochDateTime = () => {
        let newDate = new Date();
        const date = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
        updateFormInputByNameValue("createdDate", date);
    }


    const redirectToClientInfoPageAfter = (clientId, timeInSecond) => {
        const timeInMilliSecond = timeInSecond * 1000;
        setTimeout(() => {
            history.push("/client-information?id=" + clientId);
            window.scrollTo(0, 0);
        }, timeInMilliSecond);
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