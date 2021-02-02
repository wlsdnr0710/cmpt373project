import React from "react";

const NumberInputField = ({ max, min }) => {
    return (
        <input type="number" min={min} max={max} />
    );
};

export default NumberInputField;
