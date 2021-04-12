import React from "react";
import Alert from "react-bootstrap/Alert";
import "./style.css";
import Warning from "../../assets/svg/alert_icons/danger.svg";
import Danger from "../../assets/svg/alert_icons/emergency.svg";
import { displayIcon } from '../../utils/Utilities';

const AlertMessage = ({message, date, variant}) => {
    return (
        <div className="alert-message">
            <Alert variant={variant ? variant : "primary"}>
                {variant=="warning"? displayIcon(Warning, "Warning"):""}
                {variant=="danger"? displayIcon(Danger, "Danger"):""}
                {date} - {message}
            </Alert >
        </div>
    );
};

export default AlertMessage;
