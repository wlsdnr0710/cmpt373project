import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import ClientInformation from "../../components/ClientInformation";
import BackgroundCard from "../../components/BackgroundCard";
import RiskInformation from "../../components/RiskInformation";
import DisabilityInformation from "../../components/DisabilityInformation";
import axios from 'axios';
import ServerConfig from '../../config/ServerConfig';
import "./styles.css";

//TODO: Must test again with the actual the actual api rather than a mockup api
//TODO: The disability component is under works
const ClientInfo = props => {
  const history = useHistory();
  const getClientDataByGetRequest = () => {
    axios.get(ServerConfig.api.url + '/api/v1/client/' + props.id)
      .then(response => {
        var JSONData = response.data;
        formInputs["name"] = JSONData.data.firstName + " " + JSONData.data.lastName;
        formInputs["id"] = JSONData.data.id;
        formInputs["zone"] = JSONData.data.zone;
        formInputs["gender"] = JSONData.data.gender;
        formInputs["age"] = "";
        formInputs["image"] = JSONData.data.image;
        formInputs["birthdate"] = JSONData.data.birthDate;
        formInputs["date"] = JSONData.data.signupDate;
        formInputs["health"] = JSONData.data.health;
        formInputs["education"] = JSONData.data.education;
        formInputs["social"] = JSONData.data.social;
        formInputs["disabilityList"] = JSONData.data.disabilityList;
        setFormInputs(formInputs);
      })
      .catch(error => {
        console.log("Get request failed, error: " + error)
      });
  };

  const [formInputs, setFormInputs] = useState({
    "date": "YYYY-MM-DD",
    "health": "-1",
    "education": "-1",
    "social": "-1",
    "id": "123456789",
    "name": "First Last",
    "image": avatar,
    "zone": "zone",
    "gender": "M/F",
    "age": "-1",
    "birthdate": "YYYY-MM-DD",
    "disabilityList": ["One Disability", "Two Disability"]
  });

  const riskObject = {
    date: formInputs["date"],
    health: formInputs["health"],
    education: formInputs["education"],
    social: formInputs["social"]
  };

  const clientObject = {
    id: formInputs["id"],
    name: formInputs["name"],
    image: formInputs["image"],
    zone: formInputs["zone"],
    gender: formInputs["gender"],
    age: formInputs["age"],
    birthdate: formInputs["birthdate"],
  };

  const disabilityObject = {
    disabilityList: formInputs["disabilityList"]
  };

  const onClickGetNewVisitPage = props => {
    history.push({
      pathname: "/new-visit",
      state: { clientID: formInputs["id"] }
    });
  };

  const updateFormInputByNameValue = (name, value) => {
    setFormInputs(prevFormInputs => {
      const newFormInputs = { ...prevFormInputs };
      newFormInputs[name] = value;
      return newFormInputs;
    });
  };

  const updateAgeFromBirthdate = () => {
    var currDate = new Date(0);
    currDate.setUTCSeconds(formInputs["birthdate"]);
    var birthDate = new Date(0);
    birthDate.setUTCSeconds(1519096078);
    var currYear = currDate.getFullYear();
    var dateYear = birthDate.getFullYear();
    var age = currYear - dateYear;
    updateFormInputByNameValue("age", age);
  }

  useEffect(() => {
    getClientDataByGetRequest();
    updateAgeFromBirthdate();
  }, []);

  return (
    < div >
      <BackgroundCard>
        <main className="client-information">
          <ClientInformation
            className="client-general-information"
            clientObject={clientObject}
          />
          <hr className="client-information-hr" />
          <div>
            <h1>Risk Levels</h1>
            <RiskInformation
              className="client-risk-information"
              riskObject={riskObject}
              includeDateInformation={true}
            />
          </div>
          <hr className="client-information-hr" />
          <DisabilityInformation
            disabilityObject={disabilityObject}
          />
          <div className="client-information-hr">
            <div className="client-information-hr ml-5 mt-3">
              <button type="button" className="btn btn-secondary">
                Edit
              </button>
            </div>
            <div className="client-information-hr ml-5 mt-3">
              <button type="button" className="btn btn-secondary" onClick={onClickGetNewVisitPage}>
                Add Visit
              </button>
            </div>
          </div>
        </main>
      </BackgroundCard>
    </div >
  );
};

export default ClientInfo;
