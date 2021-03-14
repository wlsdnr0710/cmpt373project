import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "./style.css";

const getDisabilitiesList = (disabilityList) => {
  const listItem = [];
  for (const index in disabilityList) {
    // TODO: Change variant according to disability risk level
    const disability = (
      <ListGroup.Item variant="danger" key={disabilityList[index].id}>
        {disabilityList[index].type}
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
  if (disabilityList.length < 1) {
    return getEmptyDisabilitiesList();
  } else {
    return getDisabilitiesList(disabilityList);
  }
};

export default DisabilityInformation;
