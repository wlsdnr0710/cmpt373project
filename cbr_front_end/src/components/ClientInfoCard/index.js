import React from "react";
import ClientInfoCardAttribute from "../../components/ClientInfoCardAttribute";
import PersonSVG from "../../assets/svg/person.svg";
import "./style.css";

const ClientInfoCard = ({ client }) => {
    return (
        <div className="client-info-card">
            <div className="client-photo">
                <img src={PersonSVG} alt="" />
            </div>

            <div className="client-info">
                <div className="section">
                    <ClientInfoCardAttribute keyText="ID" valueText={client.id} />
                    <ClientInfoCardAttribute keyText="First Name" valueText={client.firstName} />
                    <ClientInfoCardAttribute keyText="Location" valueText={client.location} />
                </div>
                <div className="section">
                    <ClientInfoCardAttribute keyText="Gender" valueText={client.gender} />
                    <ClientInfoCardAttribute keyText="Last Name" valueText={client.lastName} />
                    <ClientInfoCardAttribute keyText="Village No." valueText={client.villageNumber} />
                </div>
            </div>
        </div>
    );
};

export default ClientInfoCard;
