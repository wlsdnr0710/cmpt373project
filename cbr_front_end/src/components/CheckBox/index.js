import React from "react";
import "./style.css";

const CheckBox = ({actionHandler, displayText, isDisabled}) => {
    return (
        <div className="check-box">
            <label>{displayText}</label>
            <input type="checkbox" onChange={actionHandler} disabled={isDisabled} />
        </div>
    );
};

export default CheckBox;
