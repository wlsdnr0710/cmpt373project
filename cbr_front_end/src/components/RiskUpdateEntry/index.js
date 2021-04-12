import React from "react";
import { parseISODateStringToDateString } from "../../utils/Utilities";
import "./style.css"
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./style.css";

const RiskUpdateEntry = ({ riskObject }) => {

    const riskList = ["Low", "Medium", "High", "Critical"];

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
                            {parseISODateStringToDateString(riskObject.createdDate)}
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={riskObject.id}>
                        <Card.Body className="risk-update-card">
                            <div className="risk-entry">
                                <strong>Health: </strong>
                                {riskList[riskObject.healthRisk - 1]}
                                <div className="risk-description">
                                    {riskObject.healthRiskDescription}
                                </div>
                            </div>
                            <div className="risk-entry">
                                <strong>Education: </strong>
                                {riskList[riskObject.educationRisk - 1]}
                                <div className="risk-description">
                                    {riskObject.educationRiskDescription}
                                </div>
                            </div>
                            <div className="risk-entry">
                                <strong>Social: </strong>
                                {riskList[riskObject.socialRisk - 1]}
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
