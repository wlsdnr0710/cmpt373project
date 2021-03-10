import React, { useEffect, useState } from 'react';
import { getToken } from "../../utils/AuthenticationUtil";
import { parseDateStringToEpoch, parseEpochToDateString } from "../../utils/Utilities";
import axios from 'axios';
import AlertMessage from '../../components/AlertMessage';
import ServerConfig from "../../config/ServerConfig";
import TextAreaInputField from "../../components/TextAreaInputField";
import DropdownList from "../../components/DropdownList";
import Button from 'react-bootstrap/Button';
import './style.css';

const AlertMessageBoard = () => {
    const [alertMessages, setAlertMessages] = useState({});
    const [isAddMessageOpen, setIsAddMessageOpen] = useState(false);

    const [formInputs, setFormInputs] = useState({
        "workerId": 1,
        "date": "",
        "message": "",
        "priority": 1
    })
;
    const variants = ["primary", "warning", "danger"];

    const getPriorityList = () => {
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
            console.log(response);
            let list = new Array();
            for(var i = 0; i < response.data.data.length; i++) {
                const eachPriority = variants[response.data.data[i].priority-1]
                list[i] = {
                    "variant": eachPriority,
                    "message": response.data.data[i].message,
                    "date": formatDateString(response.data.data[i].date),
                };
            }
            setAlertMessages(list);
            });
    };

    const addNewAlertMessage = () => {
        const requestHeader = {
            token: getToken()
        };

        axios.post(ServerConfig.api.url + '/api/v1/message', {
            "data": formInputs
        }, {
            headers: requestHeader,
        })
        .catch(error => {
           console.log(error.response.data);
        })

        closeAddMessageScreen();
    }

    const formatDateString = date => {
        const epoch = parseDateStringToEpoch(date);
        const dateString = parseEpochToDateString(epoch);
        return dateString;
    };

    const closeAddMessageScreen = () => {
        setIsAddMessageOpen(false);
    }

    const openAddMessageScreen = () => {
        setIsAddMessageOpen(true);
    }

    const initEpochDateTime = () => {
        let newDate = new Date();
        updateFormInputByNameValue("date", newDate);
    }

    useEffect(() => {
        getAllAlertMessages();
        initEpochDateTime();
    }, []);

    const createMessageComponents = () => {
        const alertMessageComponents = [];
        if (!alertMessages) {
            return (<AlertMessage message={"There is no alert now"} />)
        }
        else {
            for (const index in alertMessages) {
                const message = alertMessages[index].message;
                const variant = alertMessages[index].variant;
                const date = alertMessages[index].date;
                alertMessageComponents.push(<AlertMessage message={message} variant={variant} date={date} key={index}/>)
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
    }

    return (
        <div className="alert-board">
            <div className="alert-board-title">Alert Messages
                &nbsp;
                <Button onClick={getAllAlertMessages} variant="primary">Refresh</Button>
            </div>
            <div className="messages">
                {createMessageComponents()}
            </div>
            <Button onClick={openAddMessageScreen} variant="primary">Add</Button>
            { isAddMessageOpen &&
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
                    dropdownListItemsKeyValue={getPriorityList()}
                    value={formInputs["priority"]}
                    onChange={onChangePriorityHandler}
                />
                <div className="submit">
                    <Button onClick={addNewAlertMessage} variant="primary">Submit</Button>
                </div>
                </div>
            }
        </div>
    );
};

export default AlertMessageBoard;
