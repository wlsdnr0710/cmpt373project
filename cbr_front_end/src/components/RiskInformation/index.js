import React from "react";
import "./style.css";

const RiskInformation = ({className, health, education, social}) =>{
  return (
    <div className={className}>
      <h1>Risk</h1>
      <div>Health: {health}</div>
      <div>Education: {education}</div>
      <div>Social: {social}</div>
    </div>
  );
}

export default RiskInformation;
