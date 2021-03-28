import React from "react";
import { useState } from "react";
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import avatar from "../../assets/avatar.png";
import "./style.css";

const OutstandingReferral = (props) => {

    const addReferralType = (type, outputValue) => {
        if(type === true) {
            return (
                <div>
                    <Badge variant="danger">{outputValue}</Badge>
                </div>
            );
        } else {
            return null;
        }
    };

    return (
        <div className='outstanding-referral'>
            <Card>
                <Card.Body>
                    <div className="referral-client-name">{props.client.firstName} {props.client.lastName}</div>
                    {addReferralType(props.client.referrals[0].requiredServices.wheelchair, "Wheelchair")}
                    {addReferralType(props.client.referrals[0].requiredServices.physiotherapy, "Physiotherapy")}
                    {addReferralType(props.client.referrals[0].requiredServices.prosthetic, "Prosthetic")}
                    {addReferralType(props.client.referrals[0].requiredServices.orthotic, "Orthotic")}
                    {addReferralType(props.client.referrals[0].requiredServices.other, "Other")}
                    <div className="attribute">
                        <div className="attribute-title">Zone:</div>
                        <div className="attribute-value">{props.client.zoneName.name}</div>
                    </div>
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
