import React from "react";
import "./style.css";

function RiskInformation(props) {
  return (
    <div className={props.className}>
      <h1>Risk</h1>
      <p>Health: {props.health}</p>
      <p>Education: {props.education}</p>
      <p>Social: {props.social}</p>
    </div>
  );
}

export default RiskInformation;
