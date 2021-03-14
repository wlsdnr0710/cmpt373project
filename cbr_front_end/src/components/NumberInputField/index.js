import React from "react";
import { getLabelTag } from "../../utils/Utilities";

const NumberInputField = ({ max, min, name, value, onChange, isDisabled, label }) => {
  return (
    <div>
      {getLabelTag(label)}
      <input
        type="number"
        min={min}
        max={max}
        name={name}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
      />
    </div>
  );
};

export default NumberInputField;
