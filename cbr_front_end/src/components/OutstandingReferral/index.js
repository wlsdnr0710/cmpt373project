import React from "react";
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import avatar from "../../assets/avatar.png";
import "./style.css";

const OutstandingReferral = () => {

    return (
        <div className='outstanding-referral'>
            <Card>
                <Card.Body>
                    <div className="referral-client-name">test test</div>
                    <div className="attribute">
                        <div className="attribute-title">Physiotherapy</div>
                        <div className="attribute-value">Wheelchair</div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default OutstandingReferral;
