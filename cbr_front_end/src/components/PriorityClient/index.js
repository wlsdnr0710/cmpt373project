import React from "react";
import { useHistory } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import avatar from "../../assets/avatar.png";
import "./style.css";

const PriorityClient = (props) => {
    // TODO: Process Risk level to Critical/High/Medium/Low if needed. 
    const history = useHistory();

    // TODO: make the card clickable when we actually get client id from API
    const onClickCardHandler = event => {
        history.push("/client-information?id=" + props.client.id);
        window.scrollTo(0, 0);
    };
    
    return (
        <div className='priority-client'>
            <Card style={{ width: '100%', maxWidth: '350px' }}>
                <div className="client-photo-container">
                    <img src={avatar} alt="" style={{width: "100%"}} />
                </div>
                <Card.Body>
                    <div className="client-name">{props.client.Name}</div>
                    <div>
                        <Badge variant="danger">{props.client.Risk}</Badge>
                    </div>
   
                    <div className="attribute">
                        <div className="attribute-title">Zone</div>
                        <div className="attribute-value">{props.client.Zone}</div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default PriorityClient;
