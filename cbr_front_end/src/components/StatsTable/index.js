import React from "react";
import Table from 'react-bootstrap/Table';
import "./style.css";

const StatsTable = (props) => {

    return (
        <tr>
            <td>{props.stat.name}</td>
            <td>{props.stat.clientCount}</td>
            <td>{props.stat.visitCount}</td>
        </tr>
    );
};

export default StatsTable;
