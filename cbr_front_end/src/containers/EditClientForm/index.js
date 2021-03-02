import React, { useState, useCallback, useEffect } from "react";
import TextInputField from "../../components/TextInputField";
import DropdownList from "../../components/DropdownList";
import DateInputField from "../../components/DateInputField";
import avatar from "../../assets/avatar.png";
import NumberInputField from "../../components/NumberInputField";
import PhoneInputField from "../../components/PhoneInputField";
import ImageInputField from "../../components/ImageInputField";
import RiskInformation from "../../components/RiskInformation";
import {getClientInformationFromApi, getClientObject, getRiskObject, getLatestRiskUpdate} from "../../utils/Utilities";
import "./style.css";
import DisabilityInformation from "../../components/DisabilityInformation";

//TODO: Grab dropdown options from database table
const defaultClientZones = {
  "BidiBidi Zone 1": "1",
  "BidiBidi Zone 2": "2",
  "BidiBidi Zone 3": "3",
  "BidiBidi Zone 4": "4",
  "BidiBidi Zone 5": "5",
  "Palorinya Basecamp": "6",
  "Palorinya Zone 1": "7",
  "Palorinya Zone 2": "8",
  "Palorinya Zone 3": "9",
};


//TODO: Database is giving back F/M not Female / Male, making it not select correct data if not in same format 
const genders = {
  F: "F",
  M: "M",
};

//Will be passed an array of risk objects 
const riskObject = {
    "id": 2,
    "createdDate": "2020-03-20T07:00:00.000+00:00",
    "educationGoal": "some goal",
    "educationRisk": 4,
    "educationRiskDescription": "some description",
    "healthGoal": "some goal",
    "healthRisk": 1,
    "healthRiskDescription": "some description",
    "socialGoal": "some goal",
    "socialRisk": 3,
    "socialRiskDescription": "some description"
};

const EditClientForm = (props) => {
  // const parameterString = props.location.search;
  // const clientId = qs.parse(parameterString).id;

  //TODO: Revert back to these values when clicking discard changes

  const [clientInformation, setClientInformation] = useState(getClientObject());
  // const originalClientInformation;

  const getClientInformation = useCallback(() => {
    getClientInformationFromApi(props.clientID)
      .then((response) => {
        setClientInformation(response.data.data);
      })
      .catch((error) => {
        console.log("Get request failed, error: " + error);
      });
  }, [props.clientID]);

  useEffect(() => {
    getClientInformation();
  }, [getClientInformation]);

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
          dropdownName="zone" //Might need to change this to name
          value={clientInformation.zone}
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
          //TODO: need to pass it date in format yyyy-MM-dd
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
          value={clientInformation.caregiverContact}
          label="Caregiver Number: "
          onChange={handleChange}
        />
      </div>
      <hr />
      {/*TODO: Add edit information for risk and disability sections */}
      <div>
        <h1>Risk</h1>
        <RiskInformation
          riskObject={getLatestRiskUpdate(clientInformation)}
          includeDateInformation={true}
        />
        <input
          className="btn btn-secondary update-risk-button"
          type="button"
          value="Update Risk"
        />
      </div>
      <hr />
      <div>
        <DisabilityInformation 
          disabilityList ={clientInformation.disabilities}
        />
      </div>
      <hr />
      <div className="action-buttons">
        {/* TODO: Implement functions for buttons & restructure css layout for mobile*/}
        <input
          className="btn btn-secondary"
          type="button"
          value="Delete Client"
        />
        <input
          className="btn btn-secondary"
          type="button"
          value="Discard Changes"
        />
        <input
          className="btn btn-secondary"
          type="submit"
          value="Save Changes"
        />
      </div>
    </form>
  );
};

export default EditClientForm;
