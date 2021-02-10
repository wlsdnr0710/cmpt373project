import React from "react";
import "./style.css";

const DropdownList = ({ dropdownName, dropdownListItemsKeyValue, value, onChange, isDisabled }) => {
    const getDropdownListOptions = () => {
        const itemsInOptionTag = [];
        let listChildId = 0;

        for (const itemName in dropdownListItemsKeyValue) {
            const itemValue = dropdownListItemsKeyValue[itemName];

            itemsInOptionTag.push(
                <option value={itemValue} key={listChildId}>{itemName}</option>
            );

            listChildId++;
        }

        return itemsInOptionTag;
    };

    return (
        <select 
            className="dropdown-list" 
            name={dropdownName} 
            value={value} 
            onChange={onChange} 
            disabled={isDisabled}
        >
            {getDropdownListOptions()}
        </select>
    );
};

export default DropdownList;
