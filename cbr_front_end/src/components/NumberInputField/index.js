import React from "react";
import * as helper from "../HelperFunctions";

const NumberInputField = ({ max, min, name, value, onChange, isDisabled, label}) => {
  return (
    <div>
      {helper.getLabelTag(label)}
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
