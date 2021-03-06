import React from "react";
import defaultPhoto from "../../assets/avatar.png";
import "./style.css";

const ClientPhoto = ({ photoSource }) => {
    if(isPhotoSourceValid()) {
        return <img className = "client-information-image" src={photoSource} alt="client"/>
    } else {
        return <img className = "client-information-image" src={defaultPhoto} alt="client"/>
    }
};

const isPhotoSourceValid = photoSource => {
    return /(png|jpg)$/i.test(photoSource);
};

const displayClientContactNumber = (contactNumber) => {
    if (contactNumber === null || contactNumber === "") {
        return null;
    } else {
        return (
            <div className = "details"><strong>Client Contact Number:</strong> {contactNumber}</div>
        );
    }
};

const displayCaregiverName = (caregiverName) => {
    if (caregiverName === null || caregiverName === "") {
        return null;
    } else {
        return (
            <div className = "details"><strong>Caregiver Name:</strong> {caregiverName}</div>
        );
    }
};

const displayCaregiverContactNumber = (caregiverNumber) => {
    if (caregiverNumber === null || caregiverNumber === "") {
        return null;
    } else {
        return (
            <div className = "details"><strong>Caregiver Contact Number:</strong> {caregiverNumber}</div>
        );
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
                        {displayClientContactNumber(client.contactNumber)}
                        {displayCaregiverName(client.caregiverName)}
                        {displayCaregiverContactNumber(client.caregiverNumber)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientInformation;
