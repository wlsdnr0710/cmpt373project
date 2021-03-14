import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getToken, doAuthentication } from "../../utils/AuthenticationUtil";
import avatar from "../../assets/avatar.png";
import ClientInformation from "../../components/ClientInformation";
import ViewVisits from "../../components/ViewVisits";
import Accordion from 'react-bootstrap/Accordion';
import BackgroundCard from "../../components/BackgroundCard";
import RiskInformation from "../../containers/RiskInformation";
import DisabilityInformation from "../../components/DisabilityInformation";
import axios from 'axios';
import qs from "query-string";
import ServerConfig from '../../config/ServerConfig';
import { parseDateStringToEpoch, parseEpochToDateString, getClientObject, getVisitsInformationFromServer} from "../../utils/Utilities";
import "./styles.css";

const ClientInfo = props => {
  const[visits, setVisits] = useState([]);
  const history = useHistory();
  doAuthentication(history);

  const parameterString = props.location.search;
  const clientId = qs.parse(parameterString).id;

  const getClientDataByGetRequest = useCallback(() => {  
    const requestHeader = {
      token: getToken()
    };
    axios.get(ServerConfig.api.url + '/api/v1/client/' + clientId, {
      headers: requestHeader,
    })
      .then(response => {
        var JSONData = response.data;
        setFormInputs(prevFormInputs => {
          const data = JSONData.data;
          const newFormInputs = {...prevFormInputs};

          // Keep using default image if no client's image is uploaded
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

  const getVisitsDataByGetRequest = () => {
    const requestHeader = {
      token: getToken()
    };
    getVisitsInformationFromServer(clientId, requestHeader)
    .then(response => {
      setVisits(response.data.data);
    });
  };

  const createVisitListComponents = () => {
    const visitComponents = [];
    if(visits === undefined || visits.length === 0) {
      return (<p>There are no visits.</p>);
    }
    else {
      for (const index in visits) {
        visitComponents.push(<ViewVisits visit={visits[index]} key={index}/>);
      }
        return visitComponents;
    }
  };

  const parseISODateString = ISODateString => {
    const epoch = parseDateStringToEpoch(ISODateString);
    return parseEpochToDateString(epoch);
  };

  const [formInputs, setFormInputs] = useState(
    getClientObject()
  );

  const onClickGetNewVisitPage = () => {
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
    getVisitsDataByGetRequest();
  }, [getClientDataByGetRequest]);

  return (
  <div>
    < div >
      <BackgroundCard>
        <main className>
          <ClientInformation
            className="client-general-information"
            clientObject={formInputs}
          />
          <hr className="client-information-hr" />
          <h1>Risk Levels</h1>
          <RiskInformation
            className="client-risk-information"
            riskHistories={formInputs.riskHistories}
          />
          <hr className="client-information-hr" />
          <h1>Disability and Ailment(s)</h1>
          <DisabilityInformation
            disabilityList={formInputs.disabilities}
          />
          <div className="client-information-hr">
            <div className="client-information-hr mt-3">
              <button type="button" className="btn btn-secondary" onClick={onClickGetEditClientPage}>
                Edit
              </button>
            </div>
          </div>
        </main>
      </BackgroundCard>
    </div >
    <div className="view-all-visits-details">
        <BackgroundCard heading="Visits">
           {createVisitListComponents()}
           <div className="client-information-hr mt-3">
             <button type="button" className="btn btn-primary" onClick={onClickGetNewVisitPage}>
               Add Visit
             </button>
           </div>
       </BackgroundCard>
    </div>
    </div>
  );
};

export default ClientInfo;
