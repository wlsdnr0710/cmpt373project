import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import ClientInformation from "../../components/ClientInformation";
import BackgroundCard from "../../components/BackgroundCard";
import RiskInformation from "../../components/RiskInformation";
import DisabilityInformation from "../../components/DisabilityInformation";
import axios from 'axios';
import qs from "query-string";
import ServerConfig from '../../config/ServerConfig';
import { parseDateStringToEpoch, parseEpochToDateString, getClientObject, getLatestRiskUpdate} from "../../utils/Utilities";
import "./styles.css";

const ClientInfo = props => {
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
          console.log(data.photo)
          if (data.photo) {
            newFormInputs["photo"] = data.photo;
          } else {
            newFormInputs["photo"] = {avatar};
          }

          newFormInputs["name"] = data.firstName + " " + data.lastName;
          newFormInputs["id"] = data.id;
          newFormInputs["zone"] = data.zoneName.name;
          newFormInputs["villageNumber"] = data.villageNumber;
          newFormInputs["gender"] = data.gender;
          newFormInputs["age"] = data.age;
          newFormInputs["birthdate"] = parseISODateString(data.birthdate);
          newFormInputs["date"] = parseISODateString(data.signupDate);

          newFormInputs["riskHistories"] = data.riskHistories;

          newFormInputs["disabilities"] = data.disabilities;
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

  const [formInputs, setFormInputs] = useState(
    getClientObject()
  );

  const onClickGetNewVisitPage = props => {
    history.push({
      pathname: "/new-visit",
      state: { clientID: formInputs["id"] }
    });
  };

  const onClickGetEditClientPage = () => {
    history.push({
      pathname: "/edit-client",
      state: { clientID: formInputs["id"]}
    })
  }

  useEffect(() => {
    getClientDataByGetRequest();
  }, [getClientDataByGetRequest]);

  return (
    < div >
      <BackgroundCard>
        <main className>
          <ClientInformation
            className="client-general-information"
            clientObject={formInputs}
          />
          <hr className="client-information-hr" />
          <div>
            <h1>Risk Levels</h1>
            <RiskInformation
              className="client-risk-information"
              riskObject={getLatestRiskUpdate(formInputs)}
              includeDateInformation={true}
            />
          </div>
          <hr className="client-information-hr" />
          <DisabilityInformation
            disabilityList={formInputs.disabilities}
          />
          <div className="client-information-hr">
            <div className="client-information-hr mt-3">
              <button type="button" className="btn btn-secondary" onClick={onClickGetEditClientPage}>
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
