import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import "./style.css";

const StatsTable = ({values, title, index}) => {

    const createTableHeaders = () => {
        const headerComponents = [];
        if(values === undefined || values.length === 0) {
            return null;
        }
        else {
            headerComponents.push(<th></th>);
            for (let i = 0; i < values[0]["length"]; i++) {
                headerComponents.push(<th>{values[0]["header" + i]}</th>);
            }
            return headerComponents;
        }
    };

    const createTableRows = () => {
        let rowBodyComponents = [];
        const rowComponents = [];
        if(values === undefined || values.length === 0) {
            return null;
        }
        else {
            for (let i = 1; i < values.length; i++) {
                rowBodyComponents.push(<td>{values[i]["name"]}</td>);
                for (let j = 0; j < values[0]["length"]; j++) {
                    rowBodyComponents.push(<td>{values[i]["column" + j]}</td>);
                }
                rowComponents.push(<tr>{rowBodyComponents}</tr>);
                rowBodyComponents = [];
            }
            return rowComponents;
        }
    };

    return (
        <div>
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                            {title}
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={index}>
                        <Card.Body>
                            <Table striped bordered size="sm">
                                <thead>
                                    <tr>
                                        {createTableHeaders()}
                                    </tr>
                                </thead>
                                <tbody>
                                    {createTableRows()}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
};

export default StatsTable;
