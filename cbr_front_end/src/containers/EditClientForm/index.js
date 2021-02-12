import React from "react";
import TextInputField from "../../components/TextInputField";
import DropdownList from "../../components/DropdownList";
import "./style.css";

const defaultClientZones = {
  "BidiBidi Zone 1": "bidizone1",
  "BidiBidi Zone 2": "bidizone2",
  "BidiBidi Zone 3": "bidizone3",
  "BidiBidi Zone 4": "bidizone4",
  "BidiBidi Zone 5": "bidizone5",
  "Palorinya Basecamp": "palBasecamp",
  "Palorinya Zone 1": "palzone1",
  "Palorinya Zone 2": "palzone2",
  "Palorinya Zone 3": "palzone3",
};

const testClient = {
  fname: "adrian",
  lname: "wong",
  clientZone: "BidiBidi Zone 4",
  date: "",
  age: "5",
};

const EditClientForm = () => {
  return (
    <div>
      <div>
        <div className="input-field-container">
          <label>Location:</label>
          <DropdownList
            dropdownName="client-zones"
            dropdownListItemsKeyValue={defaultClientZones}
            defaultValue={testClient.clientZone}
          />
        </div>

        <label>First Name: </label>
        <TextInputField defaultValue={testClient.fname} />
      </div>
      <div>
        <label>Last Name: </label>
        <TextInputField defaultValue={testClient.lname} />
      </div>
    </div>
  );
};

export default EditClientForm;
