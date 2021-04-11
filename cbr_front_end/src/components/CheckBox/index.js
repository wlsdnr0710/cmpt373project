import React from "react";
import "./style.css";

const CheckBox = ({ name, value, actionHandler, displayText, displayTextOnRight, isDisabled, isChecked }) => {
    return (
        <div className="check-box">
            {displayTextOnRight ? null : <label>{displayText}</label>}
            <input
                name={name}
                value={value}
                type="checkbox"
                onChange={actionHandler}
                disabled={isDisabled}
                checked = {isChecked}
            />
            {displayTextOnRight ? <label className="text-on-right">{displayText}</label> : null}
        </div>
    );
};

export default CheckBox;
