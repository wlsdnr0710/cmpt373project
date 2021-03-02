import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "./style.css";

//TODO: Display items from object
const DisabilityInformation = ({ disabilityList }) => {
  const listDisabilities = (disabilityList) => {
    const listItem = [];
    for (const index in disabilityList) {
      // TODO: Change variant according to disability risk level
      const disability = (
        <ListGroup.Item 
          variant="danger" 
          key={disabilityList[index].id}>
          {disabilityList[index].type}
        </ListGroup.Item>
      );
      listItem.push(disability);
    }
    return listItem;
  };

  return (
    <div>
      <h1>Disability and Ailment(s)</h1>
      <ListGroup>{listDisabilities(disabilityList)}</ListGroup>
    </div>
  );
};

export default DisabilityInformation;
