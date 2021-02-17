import React from "react";
import * as helper from "../HelperFunctions";

const DateInputField = ({ name, value, onChange, isDisabled, label }) => {
  return (
    <div>
      {helper.getLabelTag(label)}  
      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
      />
    </div>
  );
};

export default DateInputField;
