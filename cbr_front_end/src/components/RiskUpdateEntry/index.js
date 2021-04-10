import React from "react";
import { parseEpochToDateString } from "../../utils/Utilities";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./style.css";

const getRiskDateInformation = (date) => {
    return (
        <div>
            Created: {parseEpochToDateString(date)} <hr />
        </div>
    );
};

// const get

const RiskUpdateEntry = ({ riskObject }) => {
    return (
        <div>
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle
                            as={Button}
                            variant="link"
                            eventKey={riskObject.id}
                        >
                            {parseEpochToDateString(riskObject.createdDate)}
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={riskObject.id}>
                        <Card.Body className="risk-update-card">
                            <div className="risk-entry">
                                <strong>Health: </strong>
                                {riskObject.healthRisk}
                                <div className="risk-description">
                                    {riskObject.healthRiskDescription}
                                </div>
                            </div>
                            <div className="risk-entry">
                                <strong>Education: </strong>
                                {riskObject.educationRisk}
                                <div className="risk-description">
                                    {riskObject.educationRiskDescription}
                                </div>
                            </div>
                            <div className="risk-entry">
                                <strong>Social: </strong>
                                {riskObject.socialRisk}
                                <div className="risk-description">
                                    {riskObject.socialRiskDescription}
                                </div>
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
};

export default RiskUpdateEntry;
