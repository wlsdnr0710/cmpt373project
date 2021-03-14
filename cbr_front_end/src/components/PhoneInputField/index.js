import React from "react";
import { getLabelTag } from "../../utils/Utilities";

const PhoneInputField = ({name, value, onChange, isDisabled, label}) => {
  return (
    <div>
      {getLabelTag(label)}  
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
