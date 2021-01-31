import React from "react";
import "./style.css"

const CheckBox = ({actionHandler, displayText}) => {
    return (
        <div className="check-box">
            <span className="label-container"> <label>{displayText}</label> </span>
            <input type="checkbox" onChange={actionHandler} />
        </div>
    );
};

export default CheckBox;
