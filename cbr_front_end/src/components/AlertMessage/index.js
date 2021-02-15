import React from "react";
import "./style.css";

//TODO: Add props priority that we can use to sort Alert Message
const AlertMessage = ({message}) => {
    return (
        <div className="alert-message">
            <p>{message}</p>
        </div>
    );
};

export default AlertMessage;
