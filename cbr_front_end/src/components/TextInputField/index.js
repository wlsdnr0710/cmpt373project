import React from "react";
import { getLabelTag } from "../../utils/Utilities";

const TextInputField = ({ name, value, onChange, isDisabled, label, className }) => {
  return (
    <div>
      {getLabelTag(label)}
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
        className={className}
      />
    </div>
  );
};

export default TextInputField;
