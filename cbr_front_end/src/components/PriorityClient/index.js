import React from "react";
import { useHistory } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import avatar from "../../assets/avatar.png";
import "./style.css";

const PriorityClient = (props) => {
    const risks = ["Low", "Medium", "High", "Critical"];
    const variants = ["success", "info", "warning", "danger"];
    const healthRisk = props.client.riskHistories[0].healthRisk - 1;
    const socialRisk = props.client.riskHistories[0].socialRisk - 1;
    const educationRisk = props.client.riskHistories[0].educationRisk - 1;
    const history = useHistory();

    const onClickCardHandler = event => {
        history.push("/client-information?id=" + props.client.id);
        window.scrollTo(0, 0);
    };
    
    return (
        <div className='priority-client' onClick={onClickCardHandler}>
            <Card style={{ width: '100%', maxWidth: '350px' }}>
                <div className="client-photo-container">
                    <img src={avatar} alt="" style={{width: "100%"}} />
                </div>
                <Card.Body>
                    <div className="client-name">{props.client.firstName} {props.client.lastName}</div>
                    <div>
                        <Badge className="health-risk-badge" variant={variants[healthRisk]}>{risks[healthRisk]} Health Risk</Badge>
                        <Badge variant={variants[socialRisk]}>{risks[socialRisk]} Social Risk</Badge>
                        <Badge variant={variants[educationRisk]}>{risks[educationRisk]} Education Risk</Badge>
                    </div>
                    <div className="attribute">
                        <div className="attribute-title">Zone</div>
                        <div className="attribute-value">{props.client.zoneName.name}</div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default PriorityClient;
