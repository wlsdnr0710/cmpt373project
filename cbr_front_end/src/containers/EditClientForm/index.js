import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextInputField from "../../components/TextInputField";
import DropdownList from "../../components/DropdownList";
import DateInputField from "../../components/DateInputField";
import avatar from "../../assets/avatar.png";
import NumberInputField from "../../components/NumberInputField";
import PhoneInputField from "../../components/PhoneInputField";
import ImageInputField from "../../components/ImageInputField";
import RiskInformation from "../../components/RiskInformation";
import { getToken } from "../../utils/AuthenticationUtil";
import {deleteClientFromServer, getClientInformationFromServer, getClientObject, getLatestRiskUpdate, updateClientInformationToServer} from "../../utils/Utilities";
import DisabilityInformation from "../../components/DisabilityInformation";
import "./style.css";

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

const EditClientForm = (props) => {
  const clientId = props.clientID;
  const history = useHistory();

  // const parameterString = props.location.search;
  // const clientId = qs.parse(parameterString).id;

  //TODO: Revert back to these values when clicking discard changes

  const [clientInformation, setClientInformation] = useState(getClientObject());
  const [originalClientInformation , setOriginalClientInformation] = useState(getClientObject());

  const discardChanges = () => {
    setClientInformation(originalClientInformation);
  }

  const getClientInformation = useCallback(() => {
    const requestHeader = {
      token: getToken()
    };
    getClientInformationFromServer(clientId, requestHeader)
      .then((response) => {
        setClientInformation(response.data.data);
        setOriginalClientInformation(response.data.data);
      })
      .catch((error) => {
        console.log("ERROR: Get request failed. " + error);
      });
  }, [clientId]);

  useEffect(() => {
    getClientInformation();
  }, [getClientInformation]);

  const handleChange = (event) => {
    const input = event.target;
    const name = input.name;
    const value = input.value;
    updateClientInformation(name, value);
  };


  const saveChangesAndPushClientInformationPage = () => {
    const requestHeader = {
      token: getToken()
    };
    updateClientInformationToServer(clientInformation, requestHeader)
    .then((response) => {
      //TODO: Inform the client information page that the save was a success
    })
    .catch((error) => {
      console.log("ERROR: Put request failed." + error);
    });
    history.push("/client-information?id=" + clientInformation["id"]);
  }

  const updateClientInformation = (name, value) => {
    setClientInformation((prevFormInputs) => {
      const newFormInputs = { ...prevFormInputs };
      newFormInputs[name] = value;
      return newFormInputs;
    });
  };

  const deleteClient = () => {
    const requestHeader = {
      token: getToken()
    };
    deleteClientFromServer(clientId, requestHeader)
    .then((response) =>{
     //TODO:Inform the view client page that the deletetion was a success 
    })
    .catch((error) => {
      console.log("ERROR: Delete request failed. " + error);
    })
    history.push("view-client?query=clients");
  }


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
          dropdownName="zone"
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
          //TODO: Refactor substring on birthdate information, reduce coupling 
          value={clientInformation.birthdate.substring(0,10)}
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
      {/*TODO: Add API calls for update risk and update disability buttons */}
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
        <input
          className="btn btn-secondary update-disability-button"
          type="button"
          value="Update Disability"
        />
      </div>
      <hr />
      <div className="action-buttons">
        {/* TODO: Implement functions for buttons & restructure css layout for mobile*/}
        <input
          className="btn btn-secondary"
          type="button"
          value="Delete Client"
          onClick={deleteClient}
        />
        <input
          className="btn btn-secondary"
          type="button"
          value="Discard Changes"
          onClick={discardChanges}
        />
        <input
          className="btn btn-secondary"
          type="submit"
          value="Save Changes"
          onClick={saveChangesAndPushClientInformationPage}
        />
      </div>
    </form>
  );
};

export default EditClientForm;
