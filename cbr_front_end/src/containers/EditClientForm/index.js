import React, { useState } from "react";
import TextInputField from "../../components/TextInputField";
import DropdownList from "../../components/DropdownList";
import DateInputField from "../../components/DateInputField";
import NumberInputField from "../../components/NumberInputField";
import PhoneInputField from "../../components/PhoneInputField";
import ImageInputField from "../../components/ImageInputField";
import defaultClientImage from "../../assets/avatar.png";
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
const EditClientForm = () => {
  const [formInputs, setFormInputs] = useState({
    firstName: "adrian",
    lastName: "wong",
    clientZone: "bidizone4",
    villageNumber: "4",
    birthdate: "2018-07-13",
    gender: "male",
    contactNumber: "6044526517", //TODO: telephone default not displaying
    caregiverNumber: "1",
  });

  const handleChange = (event) => {
    const input = event.target;
    const name = input.name;
    const value = input.value;
    updateClientInformation(name, value);
  };

  const updateClientInformation = (name, value) => {
    setFormInputs((prevFormInputs) => {
      const newFormInputs = { ...prevFormInputs };
      newFormInputs[name] = value;
      return newFormInputs;
    });
  };

  const [isUploadingPhoto, setIsUploading] = useState(false);

  const revealImageUpload = () => {
    setIsUploading(!isUploadingPhoto);
  }

  //TODO: Implement function to send updated form information

  return (
    <form className="edit-client-form">
      <div>
        <div className="client-image" onClick={revealImageUpload}>
          {/*TODO: Grab client image from database */}
          <img src={defaultClientImage} alt="client"></img>
          <div className="upload-banner">Upload Photo</div>
        </div>
        {/* RFC: Is there a better way to do this?*/}
        <div style={{display: isUploadingPhoto ? 'block' : 'none' }}>
          <ImageInputField
            id="client-photo-input"
            primaryText="Select a photo for CLIENT"
            secondaryText="PNG, jpg, gif files up to 10 MB in size"
          />
        </div>
      </div>

      <div className="input-field">
        <DropdownList
          dropdownListItemsKeyValue={defaultClientZones}
          dropdownName="clientZone"
          value={formInputs.clientZone}
          label="Location: "
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <NumberInputField
          name="villageNumber"
          value={formInputs.villageNumber}
          label="Village Number: "
          onChange={handleChange}
        />
      </div>
      <hr />
      <div className="input-field">
        <TextInputField
          name="firstName"
          value={formInputs.firstName}
          label="First Name: "
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <TextInputField
          name="lastName"
          value={formInputs.lastName}
          label="Last Name: "
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <DateInputField
          name="birthdate"
          value={formInputs.birthdate}
          label="Birth Date:"
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <DropdownList
          dropdownName="gender"
          dropdownListItemsKeyValue={genders}
          value={formInputs.gender}
          label="Gender: "
          onChange={handleChange}
        />
      </div>
      <hr />
      <div className="input-field">
        <PhoneInputField
          name="contactNumber"
          value={formInputs.contactNumber}
          label="Contact Number: "
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <PhoneInputField
          name="caregiverNumber"
          value={formInputs.caregiverNumber}
          label="Caregiver Number: "
          onChange={handleChange}
        />
      </div>
      <div>
        <input type="reset" value="Discard Changes" />
        <input type="submit" value="Save Changes" />
      </div>
    </form>
  );
};

export default EditClientForm;
