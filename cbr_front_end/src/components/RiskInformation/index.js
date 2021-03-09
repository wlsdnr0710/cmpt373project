import React from "react";
import {parseEpochToDateString} from "../../utils/Utilities"
import "./style.css";

const RiskHeader = (includeHeader) => {
  if (includeHeader) {
    return <h1>Risk Levels</h1>;
  } else {
    return;
  }
};

const RiskDateInformation = (includeDateInformation, date) => {
  if (includeDateInformation) {
    return <div>Created: {parseEpochToDateString(date)} <hr /></div>;
  } else {
    return;
  }
};

const RiskInformation = ({ riskObject, includeHeader, includeDateInformation }) => {
  return (
    <div className="risk-information-card">
      {RiskHeader(includeHeader)}
      <div className="risk-entry">
        {RiskDateInformation(includeDateInformation, riskObject.createdDate)}
      </div>
      <div className="risk-entry">
        <strong>Health </strong>: {riskObject.healthRisk}
        <div className="risk-description">
          {riskObject.healthRiskDescription}
        </div>
      </div>
      <div className="risk-entry">
        <strong>Education </strong>: {riskObject.educationRisk}
        <div className="risk-description">
          {riskObject.educationRiskDescription}
        </div>
      </div>
      <div className="risk-entry">
        <strong>Social </strong>: {riskObject.socialRisk}
        <div className="risk-description">
          {riskObject.socialRiskDescription}
        </div>
      </div>
    </div>
  );
};

export default RiskInformation;
