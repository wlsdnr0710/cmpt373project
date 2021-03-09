import React, { useEffect, useState } from 'react';
import { getToken } from "../../utils/AuthenticationUtil";
import { parseDateStringToEpoch, parseEpochToDateString } from "../../utils/Utilities";
import axios from 'axios';
import AlertMessage from '../../components/AlertMessage';
import ServerConfig from "../../config/ServerConfig";
import Button from 'react-bootstrap/Button';
import './style.css';

const AlertMessageBoard = () => {
    const [alertMessages, setAlertMessages] = useState({});

    const variants = ["primary", "warning", "danger"];

    const getAlertMessage = () => {
        // TODO: get alert message from backend.
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
                        "date": response.data.data[i].date,
                };
            }

            console.log(list);
                setAlertMessages(list);
            });
    };

    useEffect(() => {
        getAlertMessage();
    }, []);

    const createMessageCompoments = () => {
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
                {createMessageCompoments()}
            </div>
            <Button onClick={getAlertMessage} variant="primary">Refresh</Button>
        </div>
    );
};

export default AlertMessageBoard;
