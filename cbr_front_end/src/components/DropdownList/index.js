import React from "react";
import "./style.css"

const DropdownList = ({ dropdownName, dropdownListItemsKeyValue, placeholder }) => {
    const generateDropdownListItem = () => {
        const itemsInOptionTag = [];
        for (const itemName in dropdownListItemsKeyValue) {
            const itemValue = dropdownListItemsKeyValue[itemName];
            itemsInOptionTag.push(
                <option value={itemValue}>{itemName}</option>
            );
        }
        return itemsInOptionTag;
    };

    return (
        <select name={dropdownName}>
            <option value="" disabled selected>{placeholder}</option>
            {generateDropdownListItem()}
        </select>
    );
};

export default DropdownList;
