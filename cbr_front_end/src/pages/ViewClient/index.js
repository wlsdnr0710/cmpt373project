import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import ClientTable from "../../containers/ClientTable";
import DropdownList from "../../components/DropdownList";
import TextInputField from "../../components/TextInputField";
import "./style.css";

const ViewClient = ({ history }) => {
    const defaultSortBy = "default";
    const [sortBy, setSortBy] = useState(defaultSortBy);
    const getSortByList = () => {
        return {
            "Default": defaultSortBy,
            "ID": "id",
            "First Name": "firstName",
            "Last Name": "lastName",
            "Location": "location",
            "Village No.": "villageNumber",
            "Gender": "gender",
        };
    };

    const onChangeSortByHandler = event => {
        const sortByDropdown = event.target;
        const sortByValue = sortByDropdown.value;
        setSortBy(sortByValue);
    };

    const onClickCreateButtonHandler = () => {
        history.push("/new-client");
    };

    return (
        <div className="view-client">
            <div className="action-group">
                <div className="section">
                    <Button variant="primary" onClick={onClickCreateButtonHandler}>Create</Button>
                </div>
                <div className="section search">
                    <div className="search-text-input">
                        <TextInputField />
                    </div>
                    <div className="search-button">
                        <Button variant="secondary" onClick={() => {}}>Search</Button>
                    </div>
                </div>
                <hr />
                <div className="section">
                    <span>Sort By: </span> 
                    <DropdownList 
                        dropdownName="sort-by" 
                        dropdownListItemsKeyValue={getSortByList()}
                        onChange={onChangeSortByHandler}
                    />
                </div>
            </div>

            <div className="client-table">
                <ClientTable />
            </div>
        </div>
    );
};

export default ViewClient;
