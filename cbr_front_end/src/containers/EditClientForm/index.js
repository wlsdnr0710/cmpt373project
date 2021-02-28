import React, { useState } from "react";
import TextInputField from "../../components/TextInputField";
import DropdownList from "../../components/DropdownList";
import DateInputField from "../../components/DateInputField";
import avatar from "../../assets/avatar.png";
import NumberInputField from "../../components/NumberInputField";
import PhoneInputField from "../../components/PhoneInputField";
import ImageInputField from "../../components/ImageInputField";
import RiskInformation from "../../components/RiskInformation"
import { getClientInformationFromApi, getClientObject } from "../../utils/Utilities";
import "./style.css";

//TODO: Grab dropdown options from database table
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

const riskObject = {
  date:"Thu, Sep 29 1988",
  health: "1",
  education: "1",
  social: "1",
};

const EditClientForm = props => {
  // const parameterString = props.location.search;
  // const clientId = qs.parse(parameterString).id;

  //TODO: Revert back to these values when clicking discard changes
  

  //TODO: Refactor and place in utils (same with ClientInformation page)
  const [clientInformation, setClientInformation] = useState(getClientObject());

  const handleChange = (event) => {
    const input = event.target;
    const name = input.name;
    const value = input.value;
    updateClientInformation(name, value);
  };

  const updateClientInformation = (name, value) => {
    setClientInformation((prevFormInputs) => {
      const newFormInputs = { ...prevFormInputs };
      newFormInputs[name] = value;
      return newFormInputs;
    });
  };

  const [showImageUploader, setImageUploader] = useState(false);

  const toggleImageUpload = () => {
    setImageUploader(!showImageUploader);
  };

  const getImageUploadOnState = (showImageUploader) => {
    if (showImageUploader) {
      return (
        <ImageInputField
          id="client-photo-input"
          primaryText="Select a photo for CLIENT"
          secondaryText="PNG, jpg, gif files up to 10 MB in size"
        />
      );
    } else {
      return;
    }
  };

  //TODO: Implement function to send updated form information

  return (
    <form className="edit-client-form">
      <div>
        <div className="client-image" onClick={toggleImageUpload}>
          {/*TODO: Grab client image from database */}
          <img src={avatar} alt="client"></img>
          <div className="upload-banner">Upload Photo</div>
        </div>
        {getImageUploadOnState(showImageUploader)}
      </div>

      <div className="input-field">
        <DropdownList
          dropdownListItemsKeyValue={defaultClientZones}
          dropdownName="clientZone"
          value={clientInformation.clientZone}
          label="Location: "
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <NumberInputField
          name="villageNumber"
          value={clientInformation.villageNumber}
          label="Village Number: "
          onChange={handleChange}
        />
      </div>
      <hr />
      <div className="input-field">
        <TextInputField
          name="firstName"
          value={clientInformation.firstName}
          label="First Name: "
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <TextInputField
          name="lastName"
          value={clientInformation.lastName}
          label="Last Name: "
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <DateInputField
          name="birthdate"
          value={clientInformation.birthdate}
          label="Birth Date:"
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <DropdownList
          dropdownName="gender"
          dropdownListItemsKeyValue={genders}
          value={clientInformation.gender}
          label="Gender: "
          onChange={handleChange}
        />
      </div>
      <hr />
      <div className="input-field">
        <PhoneInputField
          name="contactNumber"
          value={clientInformation.contactNumber}
          label="Contact Number: "
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <PhoneInputField
          name="caregiverNumber"
          value={clientInformation.cbrWorkerId}
          label="Caregiver Number: "
          onChange={handleChange}
        />
      </div>
      <hr />
      {/*TODO: Add edit information for risk and disability sections */}
      <div>
        <h1>Risk</h1>
        <RiskInformation 
          riskObject = {riskObject}
          includeDateInformation = {true}
        />
        <input className = "btn btn-secondary update-risk-button" type="button" value="Update Risk" />
      </div>
      <hr />
      <div>
        <h1>Disability and Ailment(s)</h1>
      </div>
      <hr />
      <div className = "action-buttons">
      {/* TODO: Implement functions for buttons & restructure css layout for mobile*/}
        <input className = "btn btn-secondary" type="button" value="Delete Client" />
        <input className = "btn btn-secondary" type="button" value="Discard Changes" />
        <input className = "btn btn-secondary" type="submit" value="Save Changes" />
      </div>
    </form>
  );
};

export default EditClientForm;
