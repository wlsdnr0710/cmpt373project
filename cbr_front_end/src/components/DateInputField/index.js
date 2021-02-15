import React from "react";

const DateInputField = ( { name, value, onChange, isDisabled} ) => {
    return (
        <input type="date" name={name} value={value} onChange={onChange} disabled={isDisabled} />
    );
};

export default DateInputField;
