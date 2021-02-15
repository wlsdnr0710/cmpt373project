import React from "react";
import * as helper from "../HelperFunctions.js";

const PhoneInputField = (name, value, onChange, isDisabled, label) => {
  return (
    <div>
      {helper.getLabelTag(label)}  
      <input
        type="tel"
        name={name}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
      />
    </div>
  );
};

export default PhoneInputField;
