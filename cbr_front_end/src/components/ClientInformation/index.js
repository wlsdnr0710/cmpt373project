import React from "react";
import defaultPhoto from "../../assets/avatar.png";
import "./style.css";

const ClientPhoto = ({ photoSource }) => {
  //check if photo source is valid
  if(/(png|jpg)$/i.test(photoSource)){
      return<img className = "client-information-image" src={photoSource} alt="client"/>
  } else {
    return <img className = "client-information-image" src={defaultPhoto} alt="client"/>
  }
};

const ClientInformation = ({clientObject: client}) => {
  return (
    <div>
      <div className="client-information-card">
        <div className="client-information-image-container">
          {ClientPhoto(client.photo)}
          <h1 className ="name">{client.name}</h1>
        </div>
        <div className="client-info-body">
          <div className="client-info-container">
            <div className = "details"><strong>ID:</strong> {client.id}</div>
            <div className = "details"><strong>Zone:</strong> {client.zone}</div>
            <div className = "details"><strong>Village No:</strong> {client.villageNumber}</div>
            <div className = "details"><strong>Gender:</strong> {client.gender}</div>
            <div className = "details"><strong>Age:</strong> {client.age}</div>
            <div className = "details"><strong>Birthdate:</strong> {client.birthdate}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientInformation;
