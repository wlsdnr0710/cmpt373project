import React from "react";
import avatar from "../../assets/avatar.png";
import ClientInformation from "../../components/ClientInformation";
import BackgroundCard from "../../components/BackgroundCard";
import RiskInformation from "../../components/RiskInformation";
import DisabilityInformation from "../../components/DisabilityInformation";
import "./styles.css";

const ClientInfo = () => {
  return (
    <div>
      <BackgroundCard className="client-information-card">
        <ClientInformation
          className="client-general-information"
          // TODO: insert key once real objects are imported
          id="123"
          name="Bob Jones"
          image={avatar} // TODO: insert real client avatars once objects imported
          zone="1"
          gender="Male"
          age="20"
        />
        <hr className="client-information-hr" />
        <RiskInformation
          className="client-risk-information"
          health="1"
          education="1"
          social="1"
        />
        <hr className="client-information-hr" />
        <DisabilityInformation 
          //TODO: Pass in list to display disability information
          className="client-disability-information" />
        <hr className="client-information-hr" />
        <button type="button" className="btn btn-secondary client-edit-button">
          Edit
        </button>
      </BackgroundCard>
    </div>
  );
};

export default ClientInfo;
