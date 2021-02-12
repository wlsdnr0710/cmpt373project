import React from "react";
import "./style.css";

const ClientInformation = ({className, name, image, id, zone, gender, age}) => {
  return (
    <div className={className}>
      <h1 className ="client-information-name">{name}</h1>
      <div className="client-information-card">
        <img className="client-information-image" src={image} alt="client" />
        <div className = "client-information-details">ID: {id}</div>
        <div className = "client-information-details">Village No: {zone}</div>
        <div className = "client-information-details">Gender: {gender}</div>
        <div className = "client-information-details">Age: {age}</div>
      </div>
    </div>
  );
}

export default ClientInformation;
