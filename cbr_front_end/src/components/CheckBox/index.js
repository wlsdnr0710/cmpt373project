import React from "react";
import "./style.css";

const CheckBox = ({ name, value, actionHandler, displayText, isDisabled }) => {
    return (
        <div className="check-box">
            <label>{displayText}</label>
            <input 
                name={name} 
                value={value}
                type="checkbox" 
                onChange={actionHandler} 
                disabled={isDisabled} 
            />
        </div>
    );
};

export default CheckBox;
