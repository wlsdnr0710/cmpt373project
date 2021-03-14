import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { parseEpochToDateString } from "../../utils/Utilities";
import "./style.css";

const ViewVisits = (props) => {

    return (
            <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey={props.visit.id}>
                    {parseEpochToDateString(props.visit.date)}
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={props.visit.id}>
                  <Card.Body>Hello! I'm the body</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
    );
}

export default ViewVisits;