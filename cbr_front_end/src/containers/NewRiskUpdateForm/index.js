import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NewClientSurvey from "../../containers/NewClientSurvey";
import Alert from 'react-bootstrap/Alert';
import { getToken } from "../../utils/AuthenticationUtil";
import { addRiskToServer } from "../../utils/Utilities";
import "./style.css";

const NewRiskUpdateForm = props => {
    const clientId = props.clientID;
    const history = useHistory();

    const [formInputs, setFormInputs] = useState({
        "clientId": clientId,
        "createdDate": "",
        "healthRisk": "1",
        "healthRiskDescription": "",
        "educationRisk": "1",
        "educationRiskDescription": "",
        "socialRisk": "1",
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

    const showErrorMessages = () => {
        if (hasErrorMessages()) {
            const msgInDivs = packMessagesInDivs(errorMessages);
            return (
                <Alert variant="danger">
                    {msgInDivs}
                </Alert>
            );
        } else {
            return null;
        }
    };

    const packMessagesInDivs = messages => {
        const msgInDivs = [];
        for (const idx in messages) {
            const msg = messages[idx];
            msgInDivs.push(
                <div key={idx}>
                    {msg}
                </div>
            );
        }
        return msgInDivs;
    };

    const showSuccessMessage = () => {
        if (isSubmitSuccess) {
            return (
                <Alert variant="success">
                    You submitted the form successfully! You will be redirected to the client page soon.
                </Alert>
            );
        } else {
            return null;
        }
    };

    const hasErrorMessages = () => {
        return errorMessages.length !== 0;
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
            {showErrorMessages()}
            {showSuccessMessage()}
            <div>
                <input
                    className="btn btn-primary update-risk-button"
                    type="button"
                    value="Update Risk"
                    onClick={onSubmitRiskHandler}
                />
            </div>
        </form>
    );
};

export default NewRiskUpdateForm;
