import React from "react";
import "./style.css";

const ClientInformation = ({className, name, image, id, zone, gender, age}) => {
  return (
    <div className={className}>
      <h1 className ="client-information-name">{name}</h1>
      <div className="client-information-card">
        <img className="client-information-image" src={image} alt="client" />
        <p className=".client-information-details">
          ID: {id} <br />
          Zone: {zone} <br />
          Gender: {gender} <br />
          Age: {age}
        </p>
      </div>
    </div>
  );
}

export default ClientInformation;
