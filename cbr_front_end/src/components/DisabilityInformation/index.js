import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "./style.css";

const getDisabilitiesList = (disabilityList) => {
  const listItem = [];
  for (const index in disabilityList) {
    // TODO: Change variant according to disability risk level
    let type = disabilityList[index].disability.type;
    if(type === "Other") {
        type = disabilityList[index].disability.otherDescription;
    }

    const disability = (
      <ListGroup.Item variant="danger" key={disabilityList[index].disability.id}>
        {type}
      </ListGroup.Item>
    );
    listItem.push(disability);
  }
  return (
    <div>
      <ListGroup>{listItem}</ListGroup>
    </div>
  );
};

const getEmptyDisabilitiesList = () => {
  return (
    <div className="disability-information-card">
      <div className="disability-entry">No disabilities to show</div>
    </div>
  );
};

const DisabilityInformation = ({ disabilityList }) => {
  if (disabilityList === undefined) {
    return getEmptyDisabilitiesList();
  } else {
    return getDisabilitiesList(disabilityList);
  }
};

export default DisabilityInformation;