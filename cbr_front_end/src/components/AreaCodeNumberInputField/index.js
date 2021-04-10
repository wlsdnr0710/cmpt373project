import React from "react";
import "./style.css"

const AreaCodeNumberInputField = ({ max, min, name, value, onChange, isDisabled, label }) => {
    return (
        <div>
            <input
                name={"plus"}
                value={"+"}
                disabled={true}
                className="plus-text"
            />
            <input
                type="number"
                min={min}
                max={max}
                name={name}
                value={value}
                onChange={onChange}
                disabled={isDisabled}
                className="smaller-input"
            />
        </div>
    );
};

export default AreaCodeNumberInputField;
