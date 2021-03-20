import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { parseEpochToDateString } from "../../utils/Utilities";
import "./style.css";

const ViewReferrals = (props) => {

    const overview = () => {
        return (
            <div className="overview">
                <h3>Overview</h3>
                <div className="body">
                    <div className="entry">
                        <strong>Hip Width: </strong>
                        {props.referral.hipWidthInInches}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="view-visit">
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
                    </Card.Body>
                </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
}

export default ViewReferrals;
