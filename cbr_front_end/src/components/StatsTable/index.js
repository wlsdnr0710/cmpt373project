import React from "react";
import Table from 'react-bootstrap/Table';
import "./style.css";

const StatsTable = ({values}) => {

    const createTableHeaders = () => {
        const statTableHeaderComponents = [];
        if(values === undefined || values.length === 0) {
            return null;
        }
        else {
            statTableHeaderComponents.push(<th></th>);
            console.log(values[0].length);
            for (let i = 0; i < values[0]["length"]; i++) {
                statTableHeaderComponents.push(<th>{values[0]["header" + i]}</th>);
            }
            return statTableHeaderComponents;
        }
    };

    const createTableRows = () => {
        let statTableComponents = [];
        const statTableComponents2 = [];
        if(values === undefined || values.length === 0) {
            return null;
        }
        else {
            console.log(values);
            for (let i = 1; i < values.length; i++) {
                statTableComponents.push(<td>{values[i]["name"]}</td>);
                for (let j = 0; j < values[0]["length"]; j++) {
                    statTableComponents.push(<td>{values[i]["column" + j]}</td>);
                }
                statTableComponents2.push(<tr>{statTableComponents}</tr>);
                statTableComponents = [];
            }
            return statTableComponents2;
        }
    };

    return (
        <div>
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
        </div>
    );
};

export default StatsTable;
