import React from "react";
import RiskUpdateEntry from "../../components/RiskUpdateEntry";
import "./style.css";

const emptyRiskUpdate = () => {
  return (
    <div className="empty-risk-update-card">
      <div className="text">No risk updates to show</div>
    </div>
  );
};


const getPastRiskUpdateList = (riskHistories) => {
  const riskHistoriesListIsEmpty = riskHistories.length < 1;
  if (riskHistoriesListIsEmpty) {
    return emptyRiskUpdate();
  } else {
    return riskHistories.map((riskObject) => (
      <RiskUpdateEntry key={riskObject.id} riskObject={riskObject} />
    ));
  }
};

const RiskInformation = ({ riskHistories }) => {
  const sortedRiskHistories = riskHistories.sort((updateA, updateB) => updateA.id - updateB.id);
  return (
    <div>
      {getPastRiskUpdateList(sortedRiskHistories)}
    </div>
  );
};

export default RiskInformation;
