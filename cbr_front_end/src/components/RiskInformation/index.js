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
      <figure className="risk-entry">
        <strong>Health </strong>: {riskObject.healthRisk}
        <figcaption className="risk-description">
          {riskObject.healthRiskDescription}
        </figcaption>
      </figure>
      <figure className="risk-entry">
        <strong>Education </strong>: {riskObject.educationRisk}
        <figcaption className="risk-description">
          {riskObject.educationRiskDescription}
        </figcaption>
      </figure>
      <figure className="risk-entry">
        <strong>Social </strong>: {riskObject.socialRisk}
        <figcaption className="risk-description">
          {riskObject.socialRiskDescription}
        </figcaption>
      </figure>
    </div>
  );
};

export default RiskInformation;
