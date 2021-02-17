import React from "react";
import avatar from "../../assets/avatar.png";
import ClientInformation from "../../components/ClientInformation";
import BackgroundCard from "../../components/BackgroundCard";
import RiskInformation from "../../components/RiskInformation";
import DisabilityInformation from "../../components/DisabilityInformation";
import "./styles.css";

//TODO: Get objects using API call
const riskObject = {
  date:"Thu, Sep 29 1988",
  health: "1",
  education: "1",
  social: "1"
};

const clientObject = {
  id:"123",
  name:"Bob Jones",
  image: avatar,
  zone:"1",
  gender:"Male",
  age:"20",
  birthdate:"Thu, Sep 29 1961",
};

const disabilityObject = {
  disabilityList: ["something", "asda", "asdasd"]
};

const ClientInfo = () => {
  return (
    <div>
      <BackgroundCard>
        <main className = "client-information">
          <ClientInformation
            className="client-general-information"
            clientObject = {clientObject}
          />
          <hr className="client-information-hr" />
          <h1>Risk Levels</h1>
          <RiskInformation
            className="client-risk-information"
            riskObject = {riskObject}
            includeDateInformation = {true}
          />
          <hr className="client-information-hr" />
          <DisabilityInformation 
            disabilityObject = {disabilityObject}/>
          <hr className="client-information-hr" />
          <button type="button" className="btn btn-secondary">
            Edit
          </button>
        </main>
      </BackgroundCard>
    </div>
  );
};

export default ClientInfo;
