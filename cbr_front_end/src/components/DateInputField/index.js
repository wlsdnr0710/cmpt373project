import React from "react";
import { getLabelTag } from "../../utils/Utilities";

const DateInputField = ({ name, value, onChange, isDisabled, label }) => {
  return (
    <div>
      {getLabelTag(label)}  
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
