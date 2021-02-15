import React from "react";

const NumberInputField = ({ max, min, name, value, onChange, isDisabled }) => {
    return (
        <input type="number" 
            min={min} 
            max={max} 
            name={name} 
            value={value} 
            onChange={onChange} 
            disabled={isDisabled} 
        />
    );
};

export default NumberInputField;
