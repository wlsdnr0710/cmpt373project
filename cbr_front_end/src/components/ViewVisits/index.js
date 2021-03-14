import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { parseEpochToDateString } from "../../utils/Utilities";
import "./style.css";

const ViewVisits = (props) => {

    const overview = () => {
        return (
            <div className="overview">
                <h2>Overview</h2>
                <div>
                    <strong>Purpose: </strong>
                    {props.visit.purpose}
                </div>
                <div>
                    <strong>CBR Worker: </strong>
                    {props.visit.cbrWorkerName}
                </div>
                <div>
                    <strong>Zone: </strong>
                    {props.visit.zoneName.name}
                </div>
                <div>
                    <strong>Village Number: </strong>
                    {props.visit.villageNumber}
                </div>
            </div>
        )

    }

    const goals = () => {
        return (
            <div className="goals">
                <h2>Goals</h2>
                <div className="goal-entry">
                    <strong>Health Goal Progress: </strong>
                    {props.visit.healthGoalProgress}
                </div>
                <div className="goal-entry">
                    <strong>Health Outcome: </strong>
                    {props.visit.healthOutcome}
                </div>
                <div className="goal-entry">
                    <strong>Social Goal Progress: </strong>
                    {props.visit.socialGoalProgress}
                </div>
                <div className="goal-entry">
                    <strong>Social Outcome: </strong>
                    {props.visit.socialOutcome}
                </div>
                <div className="goal-entry">
                    <strong>Education Goal Progress: </strong>
                    {props.visit.educationGoalProgress}
                </div>
                <div className="goal-entry">
                    <strong>Education Outcome: </strong>
                    {props.visit.educationOutcome}
                </div>
            </div>
            );
    };

    const services = () => {
        return (
            <div>
                <h2>Services Provided</h2>

                <div>
                    <strong>Description: </strong>
                    {props.visit.serviceDescription.description}
                </div>
            </div>
        );
    }

    return (
        <Accordion>
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={props.visit.id}>
                    {parseEpochToDateString(props.visit.date)}
                    </Accordion.Toggle>
                </Card.Header>
            <Accordion.Collapse eventKey={props.visit.id}>
                <Card.Body>
                    {overview()}
                    <hr />
                    {goals()}
                    <hr />
                    {services()}
                </Card.Body>
            </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export default ViewVisits;