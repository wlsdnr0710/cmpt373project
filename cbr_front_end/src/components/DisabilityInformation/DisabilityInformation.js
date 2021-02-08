import React from "react";
import "./style.css";

function DisabilityInformation(props) {
  return (
    <div className={props.className}>
      <h1>Disability and Ailment(s)</h1>
      <ul>
        <li>Amputee </li>
        <li>Polio </li>
        <li>Spinal cord injury </li>
      </ul>
    </div>
  );
}

export default DisabilityInformation;
