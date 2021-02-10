import React, { useState, useEffect } from 'react';
import AlertMessage from '../../components/AlertMessage'
import './style.css'

const AlertMessageBoard = () => {
    const [alertMessages, setAlertMessages] = useState(["testMessage1", "testMessage2", "testMessage3", "testMessage4"]);
    const alertMessageComponents = [];
    const getAlertMessage = () => {
        for (const index in alertMessages) {
            // TODO: take message from array. 
            // risk as number, what if the risk are same?
            alertMessageComponents.push(<AlertMessage message={alertMessages[index]}/>)
            console.log(alertMessages[index])
        }
        return alertMessageComponents;
    };
    return (
        <div className="alertBoard">
            <h3>Alert: </h3>
            {getAlertMessage()}
        </div>
    );
};

export default AlertMessageBoard;