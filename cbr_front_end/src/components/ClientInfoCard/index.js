import React from "react";
import Badge from 'react-bootstrap/Badge';
import ClientInfoCardAttribute from "../../components/ClientInfoCardAttribute";
import { useHistory } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import "./style.css";

const ClientInfoCard = ({ client }) => {
    const history = useHistory();
    const onClickInfoCardHandler = event => {
        history.push("/client-information?id=" + client.id);
        window.scrollTo(0, 0);
    };

    return (
        <div className="client-info-card" onClick={onClickInfoCardHandler}>
            <div className="photo-id-display">
                <div className="client-photo">
                    <img src={avatar} alt="" />
                </div>
                <div className="id-badge-container">
                    <Badge variant="info">
                        <div>ID: {client.id}</div> 
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
