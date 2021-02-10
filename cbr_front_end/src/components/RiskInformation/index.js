import React from "react";
import "./style.css";

const RiskInformation = ({className, health, education, social}) =>{
  return (
    <div className={className}>
      <h1>Risk</h1>
      <p>Health: {health}</p>
      <p>Education: {education}</p>
      <p>Social: {social}</p>
    </div>
  );
}

export default RiskInformation;
