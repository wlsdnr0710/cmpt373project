import React from "react";

const TextInputField = ({ isDisabled, defaultValue}) => {
    return (
        <input type="text" disabled={isDisabled} defaultValue={defaultValue}/>
    );
};

export default TextInputField;
