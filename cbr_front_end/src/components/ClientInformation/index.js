import React from "react";
import "./style.css";

const ClientInformation = ({clientObject: client}) => {
  return (
    <div>
      <div className="client-information-card">
        <img className = "client-information-image" src={client.image} alt="client" />
        <div>
          <h1 className ="name">{client.name}</h1>
          <div className = "details">ID: {client.id}</div>
          <div className = "details">Village No: {client.zone}</div>
          <div className = "details">Gender: {client.gender}</div>
          <div className = "details">Age: {client.age}</div>
          <div className = "details">Birthdate: {client.birthdate}</div>
        </div>
      </div>
    </div>
  );
}

export default ClientInformation;
