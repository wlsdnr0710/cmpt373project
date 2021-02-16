import React, { useEffect, useState } from 'react';
import AlertMessage from '../../components/AlertMessage';
import './style.css';

const AlertMessageBoard = () => {
    const [alertMessages, setAlertMessages] = useState([]);
    const alertMessageComponents = [];

    const getAlertMessage = () => {
        // TODO: get alert message from backend.
        setAlertMessages(["testMessage1", "testMessage2", "testMessage3", "testMessage4"]);
    };

    useEffect(() => {
        getAlertMessage();
    }, []);

    const createMessageCompoments = () => {
        if (!alertMessages) {
            return (<AlertMessage message={"There is no alert now"} />)
        }
        for (const index in alertMessages) {
            alertMessageComponents.push(<AlertMessage message={alertMessages[index]}/>)
        }
        return alertMessageComponents;
    };

    return (
        <div className="alertBoard">
            <h3>Alert:</h3> 
            <p onClick={getAlertMessage}>Refresh</p>
            {createMessageCompoments()}
        </div>
    );
};

export default AlertMessageBoard;
