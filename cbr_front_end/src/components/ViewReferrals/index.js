import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { parseEpochToDateString } from "../../utils/Utilities";
import "./style.css";

const ViewReferrals = (props) => {

    const check = (field) => {
        if (field === true) {
            return (
                <span>
                    true
                </span>
            );
        } else {
            return (
                <span>
                    false
                </span>
            );
        }
    }

    const requiredServices = () => {
        return (
            <div className="required-services">
                <h3>Required Services</h3>
                <div className="body">
                    <div className="entry">
                        <strong>Orthotic: </strong>
                        {check(props.referral.requiredServices.orthotic)}
                    </div>
                    <div className="entry">
                        <strong>Prosthetic: </strong>
                        {check(props.referral.requiredServices.prosthetic)}
                    </div>
                    <div className="entry">
                        <strong>Physiotherapy: </strong>
                        {check(props.referral.requiredServices.physiotherapy)}
                    </div>
                    <div className="entry">
                        <strong>Wheelchair: </strong>
                        {check(props.referral.requiredServices.wheelchair)}
                    </div>
                    <div className="entry">
                        <strong>Other: </strong>
                        {check(props.referral.requiredServices.other)}
                    </div>
                    <div className="entry">
                        <strong>Other Description: </strong>
                        {check(props.referral.requiredServices.otherDescription)}
                    </div>
                </div>
            </div>
        );
    };

    const physiotherapy = () => {
        return (
            <div className="physiotherapy">
                <h3>Physiotherapy</h3>
                <div className="body">
                    <div className="entry">
                        <strong>Type: </strong>
                        {props.referral.physiotherapy.type}
                    </div>
                    <div className="entry">
                        <strong>Description: </strong>
                        {props.referral.physiotherapy.description}
                    </div>
                </div>
            </div>
        );
    };

    const overview = () => {
        return (
            <div className="overview">
                <h3>Overview</h3>
                <div className="body">
                    <div className="entry">
                        <strong>Resolved: </strong>
                        {check(props.referral.resolved)}
                    </div>
                    <div className="entry">
                        <strong>Hip Width: </strong>
                        {props.referral.hipWidthInInches}
                    </div>
                    <div className="entry">
                        <strong>Has Existing Wheelchair: </strong>
                        {check(props.referral.hasExistingWheelchair)}
                    </div>
                    <div className="entry">
                        <strong>Does Require Repairs: </strong>
                        {check(props.referral.doesRequireRepairs)}
                    </div>
                    <div className="entry">
                        <strong>Below Elbow: </strong>
                        {check(props.referral.belowElbow)}
                    </div>
                    <div className="entry">
                        <strong>Below Knee: </strong>
                        {check(props.referral.belowKnee)}
                    </div>
                    <div className="entry">
                        <strong>Intermediate User: </strong>
                        {check(props.referral.intermediateUser)}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="view-referral">
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey={props.referral.id}>
                            {props.referral.id}
                        </Accordion.Toggle>
                    </Card.Header>
                <Accordion.Collapse eventKey={props.referral.id}>
                    <Card.Body>
                        {overview()}
                        {requiredServices()}
                        {physiotherapy()}
                    </Card.Body>
                </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
}

export default ViewReferrals;
