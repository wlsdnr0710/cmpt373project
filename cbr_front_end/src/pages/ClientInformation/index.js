import React from "react";
import avatar from "./avatar.png";
import ClientInformation from "../../components/ClientInformation/ClientInformation";
import BackgroundCard from "../../components/BackgroundCard/BackgroundCard";
import RiskInformation from "../../components/RiskInformation/RiskInformation";
import DisabilityInformation from "../../components/DisabilityInformation/DisabilityInformation";
import "./styles.css";

const ClientInfo = () => {
  return (
    <div>
      <BackgroundCard heading="test">
        <ClientInformation
          className="general-information"
          // TODO: insert key once real objects are imported
          id="123"
          name="Bob Jones"
          image={avatar} // TODO: insert real client avatars once objects imported
          zone="1"
          gender="Male"
          age="20"
        />
        <hr />
        <RiskInformation
          className = "risk-information"
        />
        <hr />
        <DisabilityInformation
          className ="disability-information"
        />
        <button className ="edit-button">Edit</button>
      </BackgroundCard>
    </div>
  );
};

export default ClientInfo;
