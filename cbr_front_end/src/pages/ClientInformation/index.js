import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { doAuthentication } from "../../utils/AuthenticationUtil";
import avatar from "../../assets/avatar.png";
import ClientInformation from "../../components/ClientInformation";
import BackgroundCard from "../../components/BackgroundCard";
import RiskInformation from "../../components/RiskInformation";
import DisabilityInformation from "../../components/DisabilityInformation";
import axios from 'axios';
import qs from "query-string";
import ServerConfig from '../../config/ServerConfig';
import { parseDateStringToEpoch, parseEpochToDateString } from "../../utils/Utilities";
import "./styles.css";

const ClientInfo = props => {
  doAuthentication();
  const history = useHistory();

  const parameterString = props.location.search;
  const clientId = qs.parse(parameterString).id;

  const getClientDataByGetRequest = useCallback(() => {  
    axios.get(ServerConfig.api.url + '/api/v1/client/' + clientId)
      .then(response => {
        var JSONData = response.data;
        setFormInputs(prevFormInputs => {
          const data = JSONData.data;
          const newFormInputs = {...prevFormInputs};

          // Keep using default image if no client's image is uploaded
          if (data.image) {
            newFormInputs["image"] = data.image;
          }

          newFormInputs["name"] = data.firstName + " " + data.lastName;
          newFormInputs["id"] = data.id;
          newFormInputs["zone"] = data.zoneName.name;
          newFormInputs["villageNumber"] = data.villageNumber;
          newFormInputs["gender"] = data.gender;
          newFormInputs["age"] = data.age;
          newFormInputs["birthdate"] = parseISODateString(data.birthdate);
          newFormInputs["date"] = parseISODateString(data.signupDate);

          // TODO: Make sure the first one is always the latest history
          // Make a sorting funtion to sort histories based on date
          const risk = data.riskHistories[0];
          if (risk) {
            newFormInputs["health"] = risk.healthRiskDescription;
            newFormInputs["education"] = risk.educationRiskDescription;
            newFormInputs["social"] = risk.socialRiskDescription;
          }

          newFormInputs["disabilityList"] = data.disabilities;
          return newFormInputs;
        });
      })
      .catch(error => {
        console.log("Get request failed, error: " + error)
      });
  }, [clientId]);

  const parseISODateString = ISODateString => {
    const epoch = parseDateStringToEpoch(ISODateString);
    return parseEpochToDateString(epoch);
  };

  const [formInputs, setFormInputs] = useState({
    "date": "YYYY-MM-DD",
    "health": "N/A",
    "education": "N/A",
    "social": "N/A",
    "id": "123456789",
    "name": "First Last",
    "image": avatar,
    "zone": "zone",
    "gender": "M/F",
    "age": "-1",
    "birthdate": "YYYY-MM-DD",
    "disabilityList": ["N/A"]
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
    villageNumber: formInputs["villageNumber"],
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

  useEffect(() => {
    getClientDataByGetRequest();
  }, [getClientDataByGetRequest]);

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
            <div className="client-information-hr mt-3">
              <button type="button" className="btn btn-secondary">
                Edit
              </button>
            </div>
            <div className="client-information-hr mt-3">
              <button type="button" className="btn btn-primary" onClick={onClickGetNewVisitPage}>
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
