import React from "react";
import { useState } from "react";
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import avatar from "../../assets/avatar.png";
import "./style.css";

const OutstandingReferral = (props) => {

    const [referralsLength, setReferralsLength] = useState(0);

    return (
        <div className='outstanding-referral'>
            <Card>
                <Card.Body>
                    <div className="referral-client-name">{props.client.firstName} {props.client.lastName}</div>
                    <div className="attribute">
                        <div className="attribute-title">Date:</div>
                        <div className="attribute-value">{props.client.referrals[0].date}</div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default OutstandingReferral;
