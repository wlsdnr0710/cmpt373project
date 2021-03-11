import React, { useEffect, useState } from 'react';
import { getToken } from "../../utils/AuthenticationUtil";
import { parseEpochToDateString } from "../../utils/Utilities";
import axios from 'axios';
import AlertMessage from '../../components/AlertMessage';
import Alert from 'react-bootstrap/Alert';
import ServerConfig from "../../config/ServerConfig";
import TextAreaInputField from "../../components/TextAreaInputField";
import DropdownList from "../../components/DropdownList";
import Button from 'react-bootstrap/Button';
import './style.css';

const AlertMessageBoard = () => {
    const [alertMessages, setAlertMessages] = useState({});
    const [isAddMessageOpen, setIsAddMessageOpen] = useState(false);
    const [isMessageEmpty, setIsMessageEmpty] = useState(true);
    const [errorMessages, setErrorMessages] = useState([]);
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

    const [formInputs, setFormInputs] = useState({
        "workerId": 1,
        "date": "",
        "message": "",
        "priority": 1
    });
;
    const variantList = ["primary", "warning", "danger"];

    const getPriorityMapping = () => {
        return {
            "Low": 1,
            "Medium": 2,
            "High": 3,
        };
    };

    const getAllAlertMessages = () => {
        const requestHeader = {
            token: getToken()
        };
        axios.get(
            ServerConfig.api.url + "/api/v1/message/sortByDate",
            {
                headers: requestHeader,
            }
        )
        .then(response => {
            setAlertMessages(response.data.data);
        });
    };

    const addNewAlertMessage = () => {
        clearErrorMessages();
        const requestHeader = {
            token: getToken()
        };

        axios.post(ServerConfig.api.url + '/api/v1/message',
            {
                "data": formInputs
            },
            {
                headers: requestHeader,
            }
        )
        .catch(error => {
            updateErrorMessages(error);
        })
        .then(() => {
            onAddMessageSuccess();
        })
    };

    const onAddMessageSuccess = () => {
        if (!isMessageEmpty) {
            setIsSubmitSuccess(true);
            closeAddMessageScreen();
            setTimeout(() => {
                setIsSubmitSuccess(false);
                window.scrollTo(0, 0);
            }, 2000);
        }
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

    const showSuccessMessage = () => {
        if (isSubmitSuccess) {
            return (
                <div className="success">
                    <Alert variant="success">
                        Message added successfully!
                    </Alert>
                </div>
            );
        } else {
            return null;
        }
    };

    const clearErrorMessages = () => {
        setErrorMessages([]);
    };

    const hasErrorMessages = () => {
        return errorMessages.length !== 0;
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

    const updateErrorMessages = error => {
        setErrorMessages(prevErrorMessages => {
            let messages = ["Something went wrong on the server."];
            if (error.response) {
                messages = error.response.data.messages;
            }
            const newMessages = [...prevErrorMessages, ...messages];
            return newMessages;
        });
    };

    const closeAddMessageScreen = () => {
        updateFormInputByNameValue("message", "");
        updateFormInputByNameValue("priority", 1);
        clearErrorMessages();
        setIsAddMessageOpen(false);
        setIsMessageEmpty(true);
    };

    const openAddMessageScreen = () => {
        setIsAddMessageOpen(true);
    };

    const initEpochDateTime = () => {
        let newDate = new Date();
        updateFormInputByNameValue("date", newDate);
    };

    useEffect(() => {
        getAllAlertMessages();
        initEpochDateTime();
    }, []);

    const createMessageComponents = () => {
        const alertMessageComponents = [];
        if (!alertMessages) {
            return (<AlertMessage message={"There is no alert now"} />);
        }
        else {
            for (const index in alertMessages) {
                const message = alertMessages[index].message;
                const variant = variantList[alertMessages[index].priority - 1];
                const date = parseEpochToDateString(alertMessages[index].date);
                alertMessageComponents.push(<AlertMessage
                                                message={message}
                                                variant={variant}
                                                date={date}
                                                key={index}
                                            />
                                            );
            }
            return alertMessageComponents;
        }
    };

    const updateFormInputByNameValue = (name, value) => {
        setFormInputs(prevFormInputs => {
            const newFormInputs = { ...prevFormInputs };
            newFormInputs[name] = value;
            return newFormInputs;
        });
    };

    const onChangePriorityHandler = event => {
        const priorityDropdown = event.target;
        const priorityValue = priorityDropdown.value;
        updateFormInputByNameValue("priority", priorityValue);
    };

    const messageFormInputChangeHandler = event => {
        const input = event.target;
        const value = input.value;
        updateFormInputByNameValue("message", value);
        if (value === "") {
            setIsMessageEmpty(true);
        } else {
            setIsMessageEmpty(false);
        }
    };

    const showAddMessageForm = () => {
        if (isAddMessageOpen) {
            return (
                <div className="add">
                <hr />
                <div className="message-title">
                    Message
                </div>
                <TextAreaInputField
                    name="messageText"
                    value={formInputs["message"]}
                    onChange={messageFormInputChangeHandler}
                    disabled={false}
                />
                <div className="priority-title">
                    Priority
                </div>
                <DropdownList
                    dropdownName="priority"
                    dropdownListItemsKeyValue={getPriorityMapping()}
                    value={formInputs["priority"]}
                    onChange={onChangePriorityHandler}
                />
                <div className="submit">
                    <Button
                        className="cancel"
                        onClick={closeAddMessageScreen}
                        variant="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={addNewAlertMessage}
                        variant="primary">
                        Submit
                    </Button>
                </div>
                </div>
            );
        } else {
            return null;
        }
    };

    return (
        <div className="alert-board">
            <div className="alert-board-title">Alert Messages
                <Button
                    className="refresh"
                    onClick={getAllAlertMessages}
                    variant="primary">Refresh
                </Button>
            </div>
            <div className="messages">
                {createMessageComponents()}
            </div>
            <Button
                onClick={openAddMessageScreen}
                variant="primary">
                Add
            </Button>
            {showAddMessageForm()}
            {showErrorMessages()}
            {showSuccessMessage()}
        </div>
    );
};

export default AlertMessageBoard;
