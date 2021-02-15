import React from "react";
import TextInputField from "../../components/TextInputField";
import DropdownList from "../../components/DropdownList";
import DateInputField from "../../components/DateInputField";
import NumberInputField from "../../components/NumberInputField";
import PhoneInputField from "../../components/PhoneInputField";
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

const genders = {
  Female: "female",
  Male: "male",
};

const client = {
  firstName: "adrian",
  lastName: "wong",
  clientZone: "bidizone4",
  villageNumber: "4",
  birthdate: "2018-07-13",
  gender: "male",
  contactNumber: "6044526517", //TODO: telephone default not displaying
  caregiverNumber: "1",
};

const EditClientForm = () => {
  return (
    <main>
      <DropdownList
        dropdownListItemsKeyValue={defaultClientZones}
        value={client.clientZone}
        label="Location: "
      />
      <NumberInputField value={client.villageNumber} label="Village Number: " />
      <TextInputField value={client.firstName} label="First Name: " />
      <TextInputField value={client.lastName} label="Last Name: " />
      <DateInputField value={client.birthdate} label="Birth Date:" />
      <DropdownList
        dropdownListItemsKeyValue={genders}
        value={client.gender}
        label="Gender: "
      />
      <PhoneInputField 
        value={client.contactNumber} 
        label="Contact Number: " 
      />
      <PhoneInputField
        value={client.caregiverNumber}
        label="Caregiver Number: "
      />
    </main>
  );
};

export default EditClientForm;
