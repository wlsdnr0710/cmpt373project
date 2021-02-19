import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import ClientInformation from "../../components/ClientInformation";
import BackgroundCard from "../../components/BackgroundCard";
import RiskInformation from "../../components/RiskInformation";
import DisabilityInformation from "../../components/DisabilityInformation";
import axios from 'axios';
import ServerConfig from '../../config/ServerConfig';
import "./styles.css";

//TODO: Must add the JSONData for health, education, social and disabiltiy list when it's added to the API
//TODO: Must test again with the actual the actual api rather than a mockup api
//TODO: The disability component is under works
const ClientInfo = props => {
  const getClientDataByGetRequest = () => {
    axios.get(ServerConfig.api.url + '/api/v1/client/' + props.id)
      .then(response => {
        var JSONData = response.data;
        formInputs["name"] = JSONData.data.firstName + " " + JSONData.data.lastName;
        formInputs["id"] = JSONData.data.id;
        formInputs["zone"] = JSONData.data.zone;
        formInputs["gender"] = JSONData.data.gender;
        formInputs["age"] = JSONData.data.age;
        formInputs["image"] = JSONData.data.image;
        formInputs["birthdate"] = JSONData.data.birthDate;
        formInputs["date"] = JSONData.data.signupDate;
        formInputs["health"] = "";
        formInputs["education"] = "";
        formInputs["social"] = "";
        formInputs["disabilityList"] = [];
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
    "disabilityList": ["hi"]
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
  const history = useHistory();
  const onClickGetNewVisitPage = props => {
    history.push("/new-visit");
  };

  return (
    < div >
      {getClientDataByGetRequest()}
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
