import React from "react";
import Alert from 'react-bootstrap/Alert';
import "./style.css";

//TODO: Add props priority that we can use to sort Alert Message
const AlertMessage = ({message, date, variant}) => {
    return (
        <div className="alert-message">
            <Alert variant={variant ? variant : "primary"}>
                {date} - {message}
            </Alert >
        </div>
    );
};

export default AlertMessage;
