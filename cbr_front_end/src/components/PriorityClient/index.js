import React from "react";
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import avatar from "../../assets/avatar.png";
import "./style.css";

const PriorityClient = (props) => {
    // TODO: Process Risk level to Critical/High/Medium/Low if needed. 
    return (
        <div className='priority-client'>
            <Card style={{ width: '100%', maxWidth: '500px' }}>
                <Card.Img variant="top" src={avatar} />
                <Card.Body>
                    <Card.Title>{props.client.Name}   <Badge variant="danger">Danger</Badge></Card.Title>
                    <div className="attribute">
                        <div className="attribute-title">Risk</div>
                        <div className="attribute-value">{props.client.Risk}</div>
                    </div>

                    <div className="attribute">
                        <div className="attribute-title">Zone</div>
                        <div className="attribute-value">{props.client.Zone}</div>
                    </div>
                    <div className="button-container">
                        <Button variant="primary">View</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};


export default PriorityClient;
