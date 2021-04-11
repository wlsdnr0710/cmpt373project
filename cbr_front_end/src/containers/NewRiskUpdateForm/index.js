import React, { useState, useCallback, useEffect } from "react";
import TextInputField from "../../components/TextInputField";
import { useHistory } from "react-router-dom";
import NumberInputField from "../../components/NumberInputField";
import DateInputField from "../../components/DateInputField";
import NewClientSurvey from "../../containers/NewClientSurvey";
import { getToken } from "../../utils/AuthenticationUtil";
import {
    addRiskToServer,
    getClientInformationFromServer,
    parseEpochToDateString
} from "../../utils/Utilities";
import "./style.css";

const NewRiskUpdateForm = props => {
    const clientId = props.clientID;
    const history = useHistory();

    const [formInputs, setFormInputs] = useState({
        "clientId": clientId,
        "createdDate": "",
        "healthRisk": "",
        "healthRiskDescription": "",
        "educationRisk": "",
        "educationRiskDescription": "",
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
            const oneSecond = 1;
            redirectToClientInfoPageAfter(clientId, oneSecond);
        })
        .catch(error => {
            updateErrorMessages(error);
            setStatesWhenFormIsSubmitting(false);
        })
    };

    return (
        <form className="risk-update-form">
            <div className="input-field">
                <h3>Health Risk</h3>
                <NewClientSurvey
                    riskInputName="healthRisk"
                    needInputName="healthRiskDescription"
                    riskValue={formInputs["healthRisk"]}
                    needInputValue={formInputs["healthRiskDescription"]}
                    onRiskChange={formInputChangeHandler}
                />
            </div>
            <hr />
            <div className="input-field">
                <h3>Social Risk</h3>
                <NewClientSurvey
                    riskInputName="socialRisk"
                    needInputName="socialRiskDescription"
                    riskValue={formInputs["socialRisk"]}
                    needInputValue={formInputs["socialRiskDescription"]}
                    onRiskChange={formInputChangeHandler}
                />
            </div>
            <hr />
            <div className="input-field">
                <h3>Education Risk</h3>
                <NewClientSurvey
                    riskInputName="educationRisk"
                    needInputName="educationRiskDescription"
                    riskValue={formInputs["educationRisk"]}
                    needInputValue={formInputs["educationRiskDescription"]}
                    onRiskChange={formInputChangeHandler}
                />
            </div>
            <hr />
                <input
                    className="btn btn-primary update-risk-button"
                    type="button"
                    value="Update Risk"
                    onClick={onSubmitRiskHandler}
                />
        </form>
    );
};

export default NewRiskUpdateForm;
