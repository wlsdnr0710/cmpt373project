import React from "react";
import "./style.css";

//TODO: Display items from object 
const DisabilityInformation = ({ disabilityObject }) => {
  return (
    <div>
      <h1>Disability and Ailment(s)</h1>
      <ul>
        <li>{disabilityObject.disabilityList + ""}</li>
      </ul>
    </div>
  );
}

export default DisabilityInformation;
