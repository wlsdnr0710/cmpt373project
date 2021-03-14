import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { parseEpochToDateString } from "../../utils/Utilities";
import "./style.css";

const ViewVisits = (props) => {

    const createServiceComponents = () => {
        const serviceComponents = [];
        const serviceDescription = props.visit.serviceDescription;
        if (serviceDescription.length === 0) {
            return (
                <div>
                    No services
                </div>
            );
        }
        else {
            for (const index in serviceDescription) {
                serviceComponents.push(<div className="body" key={index}>
                                           <div className="entry">
                                              <strong>Type: </strong>
                                              {serviceDescription[index].serviceOption.type}
                                          </div>
                                           <div className="entry">
                                               <strong>Service: </strong>
                                               {serviceDescription[index].serviceOption.name}
                                           </div>
                                            <div className="entry">
                                                <strong>Description: </strong>
                                                {serviceDescription[index].description}
                                            </div>
                                        </div>
                );
            }
            return serviceComponents;
        }
    };

    const overview = () => {
        return (
            <div className="overview">
                <h3>Overview</h3>
                <div className="body">
                    <div className="entry">
                        <strong>Purpose: </strong>
                        {props.visit.purpose}
                    </div>
                    <div className="entry">
                        <strong>CBR Worker: </strong>
                        {props.visit.cbrWorkerName}
                    </div>
                    <div className="entry">
                        <strong>Zone: </strong>
                        {props.visit.zoneName.name}
                    </div>
                    <div className="entry">
                        <strong>Village Number: </strong>
                        {props.visit.villageNumber}
                    </div>
                </div>
            </div>
        );
    };

    const goals = () => {
        return (
            <div className="goals">
                <h3>Goals</h3>
                <div className="body">
                    <div className="entry">
                        <strong>Health Goal Progress: </strong>
                        {props.visit.healthGoalProgress}
                    </div>
                    <div className="entry">
                        <strong>Health Outcome: </strong>
                        {props.visit.healthOutcome}
                    </div>
                    <div className="entry">
                        <strong>Social Goal Progress: </strong>
                        {props.visit.socialGoalProgress}
                    </div>
                    <div className="entry">
                        <strong>Social Outcome: </strong>
                        {props.visit.socialOutcome}
                    </div>
                    <div className="entry">
                        <strong>Education Goal Progress: </strong>
                        {props.visit.educationGoalProgress}
                    </div>
                    <div className="entry">
                        <strong>Education Outcome: </strong>
                        {props.visit.educationOutcome}
                    </div>
                </div>
            </div>
            );
    };

    const services = () => {
        return (
            <div>
                <h3>Services Provided</h3>
                {createServiceComponents()}
            </div>
        );
    }

    return (
        <div className="view-visit">
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
        </div>
    );
}

export default ViewVisits;
