import React from "react";
import "./style.css"

const CheckBox = ({actionHandler, displayText}) => {
    return (
        <div className="check-box">
            <label>{displayText}</label>
            <input type="checkbox" onChange={actionHandler} />
        </div>
    );
};

export default CheckBox;
