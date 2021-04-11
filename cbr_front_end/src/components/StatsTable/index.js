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
            const length = Object.keys(values[0]).length;
            for (let i = 0; i < length; i++) {
                headerComponents.push(<th key={i}>{values[0]["header" + i]}</th>);
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
            const length = Object.keys(values[0]).length - 1;
            for (let i = 1; i < values.length; i++) {
                rowBodyComponents.push(<td key={i}>{values[i]["name"]}</td>);
                for (let j = 0; j < length; j++) {
                    rowBodyComponents.push(<td key={-j}>{values[i]["column" + j]}</td>);
                }
                rowComponents.push(<tr key={i}>{rowBodyComponents}</tr>);
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
                            <div>
                                <Table responsive striped bordered size="sm">
                                    <thead>
                                        <tr>
                                            {createTableHeaders()}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {createTableRows()}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
};

export default StatsTable;
