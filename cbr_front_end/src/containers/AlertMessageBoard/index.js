import React, { useEffect, useState } from 'react';
import AlertMessage from '../../components/AlertMessage';
import Button from 'react-bootstrap/Button';
import './style.css';

const AlertMessageBoard = () => {
    const [alertMessages, setAlertMessages] = useState({});

    const getAlertMessage = () => {
        // TODO: get alert message from backend.
        setAlertMessages([
            {
                "variant": "primary",
                "message": "Welcome to the CBR worker management system.",
            },
            {
                "variant": "danger",
                "message": "A client has high risk level!",
            },
            {
                "variant": "warning",
                "message": "Please complete your profile.",
            },
        ]);
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
                alertMessageComponents.push(<AlertMessage message={message} variant={variant} key={index}/>)
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
