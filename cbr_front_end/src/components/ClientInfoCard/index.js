import React from "react";
import Badge from 'react-bootstrap/Badge';
import ClientInfoCardAttribute from "../../components/ClientInfoCardAttribute";
import { useHistory } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import "./style.css";

const ClientInfoCard = ({ client, queryData }) => {
    const history = useHistory();
    const onClickHandlerNewVisits = () => {
        history.push({
            pathname: "/new-visit",
            state: { clientID: client.id }
        });
        window.scrollTo(0, 0);
    }

    const onClickHandlerNewReferrals = () => {
        history.push({
            pathname: "/new-referral",
            state: { clientID: client.id }
        });
        window.scrollTo(0, 0);
    }

    const onClickHandlerAllClients = () => {
        history.push("/client-information?id=" + client.id);
        window.scrollTo(0, 0);
    }

    const onClickHandlerComparison = () => {
        if (queryData === "visits") {
            onClickHandlerNewVisits();
        } else if (queryData === "referrals") {
            onClickHandlerNewReferrals();
        } else if (queryData === "clients") {
            onClickHandlerAllClients();
        } 
    }

    return (
        <div className="client-info-card" onClick={onClickHandlerComparison}>
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
                    <ClientInfoCardAttribute keyText="Age" valueText={client.age} />
                    <ClientInfoCardAttribute keyText="Location" valueText={client.zoneName.name} />
                </div>
                <div className="section">
                    <ClientInfoCardAttribute keyText="Last Name" valueText={client.lastName} />
                    <ClientInfoCardAttribute keyText="Gender" valueText={client.gender} />
                    <ClientInfoCardAttribute keyText="Village No." valueText={client.villageNumber} />
                </div>
            </div>
        </div>
    );
};

export default ClientInfoCard;
