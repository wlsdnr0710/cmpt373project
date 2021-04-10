import React from "react";
import defaultPhoto from "../../assets/avatar.png";
import "./style.css";

const WorkerPhoto = ({ photoSource }) => {
  if(isPhotoSourceValid()) {
    return <img className = "worker-information-image" src={photoSource} alt="worker"/>
  } else {
    return <img className = "worker-information-image" src={defaultPhoto} alt="worker"/>
  }
};

const isPhotoSourceValid = photoSource => {
  return /(png|jpg)$/i.test(photoSource);
}

const WorkerInformation = ({workerObject: worker}) => {
  return (
    <div>
      <div className="worker-information-card">
        <div className="worker-information-image-container">
          {WorkerPhoto(worker.photo)}
          <h1 className ="name">{worker.name}</h1>
        </div>
        <div className="worker-info-body">
          <div className="worker-info-container">
            <div className = "details"><strong>ID:</strong> {worker.id}</div>
            <div className = "details"><strong>Zone:</strong> {worker.zone}</div>
            <div className = "details"><strong>Role:</strong> {worker.role}</div>
            <div className = "details"><strong>Email:</strong> {worker.email}</div>
            <div className = "details"><strong>Contact Number:</strong> {worker.contactNumber}</div>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default WorkerInformation;
