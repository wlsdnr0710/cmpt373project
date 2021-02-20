import React, { useEffect, useState } from 'react';
import AlertMessage from '../../components/AlertMessage';
import './style.css';

const AlertMessageBoard = () => {
    const [alertMessages, setAlertMessages] = useState([]);

    const getAlertMessage = () => {
        // TODO: get alert message from backend.
        setAlertMessages(["testMessage1", "testMessage2", "testMessage3", "testMessage4"]);
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
                alertMessageComponents.push(<AlertMessage message={alertMessages[index]} key={index}/>)
            }
            return alertMessageComponents;
        }
    };

    return (
        <div className="alert-board">
            <h4>Alert:</h4> 
            <button onClick={getAlertMessage}>Refresh</button>
            {createMessageCompoments()}
        </div>
    );
};

export default AlertMessageBoard;
