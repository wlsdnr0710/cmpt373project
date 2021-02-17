import React from "react";
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
    return <div>Created: {date} <hr /></div>;
  } else {
    return;
  }
};

const RiskInformation = ({riskObject, includeHeader, includeDateInformation}) => {
  //TODO: Refactor health, education, social and dates to be in a risk object
  return (
    <div className="risk-information-card">
      {RiskHeader(includeHeader)}
      <div className="risk-entry">
        {RiskDateInformation(includeDateInformation, riskObject.date)}
      </div>
      <div className="risk-entry">
        <strong>Health </strong>: {riskObject.health}
      </div>
      <div className="risk-entry">
        <strong>Education </strong>: {riskObject.education}
      </div>
      <div className="risk-entry">
        <strong>Social </strong>: {riskObject.social}
      </div>
    </div>
  );
};

export default RiskInformation;
