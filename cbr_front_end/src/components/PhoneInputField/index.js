import React from "react";
import * as helper from "../HelperFunctions.js";

const PhoneInputField = ({name, value, onChange, isDisabled, label}) => {
  return (
    <div>
      {helper.getLabelTag(label)}  
      <input
        type="tel"
        name={name}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
      />
    </div>
  );
};

export default PhoneInputField;
