import React from "react";
import "./style.css";
import { getLabelTag } from "../../utils/Utilities";

const DropdownList = ({dropdownName ,dropdownListItemsKeyValue ,value ,onChange ,isDisabled ,label, className}) => {
    const getDropdownListOptions = () => {
	    const itemsInOptionTag = [];
	    let listChildId = 0;

	    for (const itemName in dropdownListItemsKeyValue) {
	        let itemValue = "";
	        let name = itemName;

            if (dropdownListItemsKeyValue[itemName].name !== undefined) {
                itemValue = dropdownListItemsKeyValue[itemName].id;
                name = dropdownListItemsKeyValue[itemName].name;
            } else {
                itemValue = dropdownListItemsKeyValue[itemName];
            }

            itemsInOptionTag.push(
            <option value={itemValue} key={listChildId}>
                {name}
            </option>
            );

            listChildId++;
        };

        return itemsInOptionTag;
    };

    return (
        <div>
            {getLabelTag(label)}
            <select
                className={className}
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
