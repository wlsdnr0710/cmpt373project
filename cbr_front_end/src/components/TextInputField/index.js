import React from "react";

const TextInputField = ({ name, value, onChange, isDisabled }) => {
    return (
        <input type="text" name={name} value={value} onChange={onChange} disabled={isDisabled} />
    );
};

export default TextInputField;
