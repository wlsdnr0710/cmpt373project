import React from "react";
import * as helper from "../HelperFunctions";

const TextInputField = ({ name, value, onChange, isDisabled, label }) => {
  return (
    <div>
      {helper.getLabelTag(label)}
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
      />
    </div>
  );
};

export default TextInputField;
