import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import avatar from "../../assets/avatar.png";
import "./style.css";

const OutstandingReferral = (props) => {
    const history = useHistory();

    const addReferralType = (type, outputValue) => {
        if(type === true) {
            return (
                <Badge className="badge" variant="danger">{outputValue}</Badge>
            );
        } else {
            return null;
        }
    };

    const onClickCardHandler = event => {
        history.push("/client-information?id=" + props.client.id);
        window.scrollTo(0, 0);
    };

    return (
        <div className="outstanding-referral" onClick={onClickCardHandler}>
            <Card style={{ width: "100%", maxWidth: "350px" }}>
                <Card.Body>
                    <div className="client-name">{props.referral.client.firstName} {props.referral.client.lastName}</div>
                    {addReferralType(props.referral.requiredServices.wheelchair, "Wheelchair")}
                    {addReferralType(props.referral.requiredServices.physiotherapy, "Physiotherapy")}
                    {addReferralType(props.referral.requiredServices.prosthetic, "Prosthetic")}
                    {addReferralType(props.referral.requiredServices.orthotic, "Orthotic")}
                    {addReferralType(props.referral.requiredServices.other, "Other")}
                    <div className="attribute">
                        <div className="attribute-title">Zone:</div>
                        <div className="attribute-value">{props.referral.client.zoneName.name}</div>
                    </div>
                    <div className="attribute">
                        <div className="attribute-title">Date:</div>
                        <div className="attribute-value">{props.referral.date}</div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default OutstandingReferral;
