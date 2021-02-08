import React from "react";
import "./style.css";

function ClientInformation(props) {
  return (
    <div className={props.className}>
      <h1 className ="client-information-name">{props.name}</h1>
      <div className="client-information-card">
        <img className="client-information-image" src={props.image} alt="client" />
        <p className=".client-information-details">
          ID: {props.id} <br />
          Zone: {props.zone} <br />
          Gender: {props.gender} <br />
          Age: {props.age}
        </p>
      </div>
    </div>
  );
}

export default ClientInformation;
