import React, { useEffect, useState } from 'react';
import { getToken } from "../../utils/AuthenticationUtil";
import { parseDateStringToEpoch, parseEpochToDateString } from "../../utils/Utilities";
import axios from 'axios';
import AlertMessage from '../../components/AlertMessage';
import ServerConfig from "../../config/ServerConfig";
import TextAreaInputField from "../../components/TextAreaInputField";
import Button from 'react-bootstrap/Button';
import './style.css';

const AlertMessageBoard = () => {
    const [alertMessages, setAlertMessages] = useState({});

    const variants = ["primary", "warning", "danger"];
    let messageTextValue;

    const getAllAlertMessages = () => {
        const requestHeader = {
            token: getToken()
        };

        axios.get(
                ServerConfig.api.url + "/api/v1/message",
                {
                    headers: requestHeader,
                }
            )
            .then(response => {
            var list = new Array();
            for(var i = 0; i < response.data.data.length; i++) {
                const eachPriority = variants[response.data.data[i].priority-1]
                list[i] = {
                    "variant": eachPriority,
                    "message": response.data.data[i].message,
                    "date": parseEpochToDateString(response.data.data[i].date),
                };
            }
            setAlertMessages(list);
            });
    };

    const addNewAlertMessage = () => {
        const requestHeader = {
            token: getToken()
        };

        const data = { "workerId": 1, "message": "All staff pizza lunch", "priority": 2, "date": "2020-03-05"
        }

        axios.post(ServerConfig.api.url + '/api/v1/message', {
            "data": data
        }, {
            headers: requestHeader,
        })
        .catch(error => {
                       console.log(error.response.data);
                    })
    }


    const parseISODateString = ISODateString => {
        const epoch = parseDateStringToEpoch(ISODateString);
        return parseEpochToDateString(epoch);
    };

    useEffect(() => {
        getAllAlertMessages();
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
                alertMessageComponents.push(<AlertMessage message={message} variant={variant} date={date}/>)
            }
            return alertMessageComponents;
        }
    };

    return (
        <div className="alert-board">
            <div className="alert-board-title">Alert Messages</div> 
            <div className="messages">
                {createMessageComponents()}
            </div>
            <Button onClick={getAllAlertMessages} variant="primary">Refresh</Button>
            &nbsp;
            <Button variant="primary">Add</Button>
            <div className="add">
            <TextAreaInputField
                name="message"
                value={messageTextValue}
                disabled={false}
            />
            <Button onClick={addNewAlertMessage} variant="primary">Submit</Button>
            </div>
        </div>
    );
};

export default AlertMessageBoard;
