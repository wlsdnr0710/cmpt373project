import React from "react";
import Badge from 'react-bootstrap/Badge';
import ClientInfoCardAttribute from "../../components/ClientInfoCardAttribute";
import { useHistory } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import "./style.css";

const WorkerInfoCard = ({ worker }) => {
    const history = useHistory();
    const onClickAllWorkersHandler = () => {
        history.push("/worker-information?id=" + worker.id);
        window.scrollTo(0, 0);
    }

    return (
        <div className="worker-info-card" onClick={onClickAllWorkersHandler}>
            <div className="photo-id-display">
                <div className="worker-photo">
                    <img src={avatar} alt="" />
                </div>
                <div className="id-badge-container">
                    <Badge variant="info">
                        <div>ID: {worker.id}</div>
                    </Badge>
                </div>
            </div>

            <div className="worker-info">
                <div className="section">
                    <ClientInfoCardAttribute keyText="First Name" valueText={worker.firstName} />
                    <ClientInfoCardAttribute keyText="Last Name" valueText={worker.lastName} />
                    <ClientInfoCardAttribute keyText="Role" valueText={worker.role} />
                </div>
                <div className="section">
                    <ClientInfoCardAttribute keyText="Phone" valueText={worker.phone} />
                    <ClientInfoCardAttribute keyText="Email" valueText={worker.email} />
                    <ClientInfoCardAttribute keyText="Location" valueText={worker.zoneName.name} />
                </div>
            </div>
        </div>
    );
};

export default WorkerInfoCard;
