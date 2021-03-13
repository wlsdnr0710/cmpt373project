import React from "react";
import { useHistory } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import avatar from "../../assets/avatar.png";
import "./style.css";

const PriorityClient = (props) => {
    const risks = ["Low", "Medium", "High", "Critical"];
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
                        <Badge variant="danger">{risks[props.client.riskHistories.riskSum]}</Badge>
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
