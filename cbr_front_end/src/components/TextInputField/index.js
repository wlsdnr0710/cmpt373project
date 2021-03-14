import React from "react";
import { getLabelTag } from "../../utils/Utilities";

const TextInputField = ({ name, value, onChange, isDisabled, label }) => {
  return (
    <div>
      {getLabelTag(label)}
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
