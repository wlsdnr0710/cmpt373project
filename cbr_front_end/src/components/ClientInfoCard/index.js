import React from "react";
import Badge from 'react-bootstrap/Badge';
import ClientInfoCardAttribute from "../../components/ClientInfoCardAttribute";
import { useHistory } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import "./style.css";

const ClientInfoCard = props => {
    const history = useHistory();
    const clientData = props.client;
    const onClickHandlerNewVisits = () => {
        history.push({
            pathname: "/new-visit",
            state: { clientID: clientData.id }
        });
        window.scrollTo(0, 0);
    }

    const onClickHandlerAllClients = () => {
        history.push("/client-information?id=" + clientData.id);
        window.scrollTo(0, 0);
    }

    const onClickHandlerComparison = () => {
        if (props.queryData === "visits") {
            onClickHandlerNewVisits();
        } else if (props.queryData === "clients") {
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
                        <div>ID: {clientData.id}</div>
                    </Badge>
                </div>
            </div>

            <div className="client-info">
                <div className="section">
                    <ClientInfoCardAttribute keyText="First Name" valueText={clientData.firstName} />
                    <ClientInfoCardAttribute keyText="Location" valueText={clientData.location} />
                    <ClientInfoCardAttribute keyText="Risk" valueText={clientData.risk} />
                    <ClientInfoCardAttribute keyText="Age" valueText={clientData.age} />
                </div>
                <div className="section">
                    <ClientInfoCardAttribute keyText="Gender" valueText={clientData.gender} />
                    <ClientInfoCardAttribute keyText="Last Name" valueText={clientData.lastName} />
                    <ClientInfoCardAttribute keyText="Village No." valueText={clientData.villageNumber} />
                    <ClientInfoCardAttribute keyText="Disability" valueText={clientData.disability} />
                </div>
            </div>
        </div>
    );
};

export default ClientInfoCard;
