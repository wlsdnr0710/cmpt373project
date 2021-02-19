import React from "react";
import "./style.css";

//TODO: Display items from object 
const DisabilityInformation = ({ disability }) => {
  return (
    <div>
      <h1>Disability and Ailment(s)</h1>
      <ul>
        <li>{disability}</li>
      </ul>
    </div>
  );
}

export default DisabilityInformation;
