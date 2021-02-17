import React from "react";
import Badge from 'react-bootstrap/Badge';
import ClientInfoCardAttribute from "../../components/ClientInfoCardAttribute";
import PersonSVG from "../../assets/svg/person.svg";
import "./style.css";

const ClientInfoCard = ({ client }) => {
    return (
        <div className="client-info-card">
            <div className="photo-id-display">
                <div className="client-photo">
                    <img src={PersonSVG} alt="" />
                </div>
                <div className="id-badge-container">
                    <Badge variant="info">
                        <div>ID</div> 
                        <div>{client.id}</div>
                    </Badge>
                </div>
            </div>

            <div className="client-info">
                <div className="section">
                    <ClientInfoCardAttribute keyText="First Name" valueText={client.firstName} />
                    <ClientInfoCardAttribute keyText="Location" valueText={client.location} />
                    <ClientInfoCardAttribute keyText="Risk" valueText={client.risk} />
                    <ClientInfoCardAttribute keyText="Age" valueText={client.age} />
                </div>
                <div className="section">
                    <ClientInfoCardAttribute keyText="Gender" valueText={client.gender} />
                    <ClientInfoCardAttribute keyText="Last Name" valueText={client.lastName} />
                    <ClientInfoCardAttribute keyText="Village No." valueText={client.villageNumber} />
                    <ClientInfoCardAttribute keyText="Disability" valueText={client.disability} />
                </div>
            </div>
        </div>
    );
};

export default ClientInfoCard;