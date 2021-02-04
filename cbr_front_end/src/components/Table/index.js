import React from "react";
import { default as BootstrapTable } from 'react-bootstrap/Table';

const Table = ( { headers, data } ) => {
    const generateTableHeaderTags = headers => {
        const headerTags = [];
        for (const i in headers) {
            const tag = <th key={i}>{headers[i]}</th>;
            headerTags.push(tag);
        }
        return headerTags;
    };

    const generateTableDataTagsByHeaders = (data, headers) => {
        const dataTags = [];
        for (const i in data) {
            let tag;
            const tdTags = [];
            const datum = data[i];
            for (const j in headers) {
                const header = headers[j];
                tag = (
                    <td key={i + "-" + j}>{datum[header]}</td>
                );
                tdTags.push(tag);
            }
            const trTag = React.createElement('tr', {
                children: tdTags,
                className: "red",
                key: i
            });
            dataTags.push(trTag);
        }
        return dataTags;
    };

    return (
        <BootstrapTable responsive striped bordered hover size="sm">
            <thead>
                <tr>
                    {generateTableHeaderTags(headers)}
                </tr>
            </thead>
            <tbody>
                {generateTableDataTagsByHeaders(data, headers)}
            </tbody>
        </BootstrapTable>
    );
};

export default Table;
