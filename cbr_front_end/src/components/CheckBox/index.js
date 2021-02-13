import React from "react";
import "./style.css";

const CheckBox = ({ name, value, actionHandler, displayText, isDisabled, isHidden }) => {
    return (
        <div className="check-box">
            <label hidden={isHidden}>{displayText}</label>
            <input
                name={name}
                value={value}
                type="checkbox"
                onChange={actionHandler}
                disabled={isDisabled}
                hidden={isHidden}
            />
        </div>
    );
};

export default CheckBox;
