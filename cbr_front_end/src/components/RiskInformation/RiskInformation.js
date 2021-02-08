import React from "react";
import "./style.css";

function RiskInformation(props) {
  return (
    <div className={props.className}>
      <h1>Risk</h1>
      <p>Health</p>
      <p>Education</p>
      <p>Social</p>
    </div>
  );
}

export default RiskInformation;
