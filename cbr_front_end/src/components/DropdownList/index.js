import React from "react";
import "./style.css";
import { getLabelTag } from "../../utils/Utilities";

const DropdownList = ({dropdownName ,dropdownListItemsKeyValue ,value ,onChange ,isDisabled ,label}) => {
  const getDropdownListOptions = () => {
    const itemsInOptionTag = [];
    let listChildId = 0;

    for (const itemName in dropdownListItemsKeyValue) {
      const itemValue = dropdownListItemsKeyValue[itemName];

      itemsInOptionTag.push(
        <option value={itemValue} key={listChildId}>
          {itemName}
        </option>
      );

      listChildId++;
    }

    return itemsInOptionTag;
  };

  return (
    <div>
      {getLabelTag(label)}
      <select
        className="dropdown-list"
        name={dropdownName}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
      >
        {getDropdownListOptions()}
      </select>
    </div>
  );
};

export default DropdownList;
