import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { parseEpochToDateString } from "../../utils/Utilities";
import avatar from "../../assets/avatar.png";
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
    };

    const formatProsthetic = (belowKnee) => {
        if (belowKnee === true) {
            return (
                <span>
                    Below Knee
                </span>
            );
        } else {
            return (
                <span>
                    Above Knee
                </span>
            );
        }
    };

    const formatOrthotic = (belowElbow) => {
        if (belowElbow === true) {
            return (
                <span>
                    Below Elbow
                </span>
            );
        } else {
            return (
                <span>
                    Above Elbow
                </span>
            );
        }
    };

    const formatIntermediateUser = (intermediateUser) => {
        if (intermediateUser === true) {
            return (
                <span>
                    Intermediate
                </span>
            );
        } else {
            return (
                <span>
                    Basic
                </span>
            );
        }
    };

    const formatResolved = (resolved) => {
        if (resolved === true) {
            return (
                <span>
                    - (Resolved)
                </span>
            );
        }
    };

    const createOutcomeSection = (outcome) => {
        if (outcome !== null) {
            return (
                <div className="outcome">
                    <h3>Outcome</h3>
                    <div className="body">
                        <div className="entry">
                            {props.referral.outcome}
                        </div>
                    </div>
                </div>
            );
        }
    };

    const createPhysiotherapySection = () => {
        if (props.referral.requiredServices.physiotherapy === true) {
            return (
                <div className="physiotherapy">
                    <h3>Physiotherapy</h3>
                    <div className="body">
                        <div className="client-photo">
                            <img src={avatar} alt="" />
                        </div>
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
        }
    };

    const createProstheticSection = () => {
        if (props.referral.requiredServices.prosthetic === true) {
            return (
                <div className="prosthetic">
                    <h3>Prosthetic</h3>
                    <div className="body">
                        <div className="entry">
                            <strong>Location: </strong>
                            {formatProsthetic(props.referral.belowKnee)}
                        </div>
                    </div>
                </div>
            );
        }
    };

    const createOrthoticSection = () => {
        if (props.referral.requiredServices.orthotic === true) {
            return (
                <div className="orthotic">
                    <h3>Orthotic</h3>
                    <div className="body">
                        <div className="entry">
                            <strong>Location: </strong>
                            {formatOrthotic(props.referral.belowElbow)}
                        </div>
                    </div>
                </div>
            );
        }
    };

    const createOtherSection = () => {
        if (props.referral.requiredServices.other === true) {
            return (
                <div className="other">
                    <h3>Other</h3>
                    <div className="body">
                        <div className="entry">
                            <strong>Description: </strong>
                            {props.referral.requiredServices.otherDescription}
                        </div>
                    </div>
                </div>
            );
        }
    };

    const createWheelchairSection = () => {
        if (props.referral.requiredServices.wheelchair === true) {
            return (
                <div className="wheelchair">
                    <h3>Wheelchair</h3>
                    <div className="body">
                        <div className="client-photo">
                            <img src={avatar} alt="" />
                        </div>
                        <div className="entry">
                            <strong>Intermediate User: </strong>
                            {formatIntermediateUser(props.referral.intermediateUser)}
                        </div>
                        <div className="entry">
                            <strong>Hip Width: </strong>
                            {props.referral.hipWidthInInches} inches
                        </div>
                        <div className="entry">
                            <strong>Has Existing Wheelchair: </strong>
                            {check(props.referral.hasExistingWheelchair)}
                        </div>
                        <div className="entry">
                            <strong>Does Require Repairs: </strong>
                            {check(props.referral.doesRequireRepairs)}
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="view-referral">
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey={props.referral.id}>
                            {parseEpochToDateString(props.referral.date)} {formatResolved(props.referral.resolved)}
                        </Accordion.Toggle>
                    </Card.Header>
                <Accordion.Collapse eventKey={props.referral.id}>
                    <Card.Body>
                        {createOutcomeSection(props.referral.outcome)}
                        {createWheelchairSection()}
                        {createProstheticSection()}
                        {createOrthoticSection()}
                        {createPhysiotherapySection()}
                        {createOtherSection()}
                    </Card.Body>
                </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
}

export default ViewReferrals;
