import React from "react";
import "./style.css";

const AlertMessage = ({message, riskLevel}) => {
    return (
        <div className="alert-message">
            <p>{message}</p>
        </div>
    );
};

export default AlertMessage;
