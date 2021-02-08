import React from "react";

const DateInputField = ( {isDisabled} ) => {
    return (
        <input type="date" disabled={isDisabled} />
    );
};

export default DateInputField;
