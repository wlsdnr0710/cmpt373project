import React from "react";
import "./style.css";

const ClientInformation = ({clientObject}) => {
  return (
    <div>
      <div className="client-information-card">
        <img className = "client-information-image" src={clientObject.image} alt="client" />
        <div>
          <h1 className ="name">{clientObject.name}</h1>
          <div className = "details">ID: {clientObject.id}</div>
          <div className = "details">Village No: {clientObject.zone}</div>
          <div className = "details">Gender: {clientObject.gender}</div>
          <div className = "details">Age: {clientObject.age}</div>
          <div className = "details">Birthdate: {clientObject.birthdate}</div>
        </div>
      </div>
    </div>
  );
}

export default ClientInformation;
