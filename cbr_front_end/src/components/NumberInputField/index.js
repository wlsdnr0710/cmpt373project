import React from "react";

const NumberInputField = ({ max, min, isDisabled }) => {
    return (
        <input type="number" min={min} max={max} disabled={isDisabled} />
    );
};

export default NumberInputField;
