import React, { useState } from "react";
import RiskUpdateEntry from "../../components/RiskUpdateEntry";
import "./style.css";

const emptyRiskUpdate = () => {
  return (
    <div className="empty-risk-update-card">
      <div className="text">No risk updates to show</div>
    </div>
  );
};

const getRiskUpdateList = (separatedRiskUpdates) => {
  const riskHistoriesListIsEmpty =
    separatedRiskUpdates.mostRecentUpdate === undefined ||
    separatedRiskUpdates.pastHistory.length < 1;

  if (riskHistoriesListIsEmpty) {
    return emptyRiskUpdate();
  } else {
    return (
      <RiskUpdateEntry
        key={separatedRiskUpdates.mostRecentUpdate.id}
        riskObject={separatedRiskUpdates.mostRecentUpdate}
      />
    );
  }
};

const getPastRiskUpdateList = (riskHistories) => {
  console.log(riskHistories);
  const riskHistoriesListIsEmpty = riskHistories.length < 1;
  if (riskHistoriesListIsEmpty) {
    return emptyRiskUpdate();
  } else {
    return riskHistories.map((riskObject) => (
      <RiskUpdateEntry key={riskObject.id} riskObject={riskObject} />
    ));
  }
};

//spliceRiskHistory getting past a riskHistory w/ length of 0
const spliceRiskHistory = (riskHistories) => {
  let mostRecentUpdate = riskHistories[0];
  let mostRecentUpdateIndex = 0;
  for (let i = 0; i < riskHistories.length; i++) {
    if (riskHistories[i].id < mostRecentUpdate.id) {
      mostRecentUpdate = riskHistories[i];
      mostRecentUpdateIndex = i;
    }
  }
  return {
    mostRecentUpdate: mostRecentUpdate,
    pastHistory: riskHistories.splice(mostRecentUpdateIndex),
  };
};

const RiskInformation = ({ riskHistories }) => {
  const [showMoreRiskUpdates, setShowMoreRiskUpdates] = useState(false);
  const separatedRiskUpdates = spliceRiskHistory(riskHistories);
  console.log(separatedRiskUpdates);

  const toggleShowMoreRiskUpdates = () => {
    setShowMoreRiskUpdates(!showMoreRiskUpdates);
  };

  const showMoreRiskUpdatesOnState = (showMoreRiskUpdates) => {
    if (showMoreRiskUpdates) {
      getPastRiskUpdateList(separatedRiskUpdates.pastHistory);
    } else {
      return null;
    }
  };

  return (
    <div>
      {/* <button onClick={toggleShowMoreRiskUpdates}> */}
      <button>
        Show More
      </button>
      {/* {showMoreRiskUpdatesOnState(showMoreRiskUpdates)} */}
      {getPastRiskUpdateList(riskHistories)}
    </div>
  );
};

export default RiskInformation;
