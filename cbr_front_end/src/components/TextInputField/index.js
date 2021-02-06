import React from "react";

const TextInputField = ({ isDisabled }) => {
    return (
        <input type="text" disabled={isDisabled} />
    );
};

export default TextInputField;
