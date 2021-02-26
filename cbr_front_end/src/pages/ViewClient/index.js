import React from "react";
import Button from 'react-bootstrap/Button';
import ClientTable from "../../containers/ClientTable";
import qs from "query-string"
import "./style.css";

const ViewClient = ({ history, location }) => {
    const onClickCreateButtonHandler = () => {
        history.push("/new-client");
    };

    const parseQueryData = () => {
        const parameterString = location.search;
        const queryData = qs.parse(parameterString).query;
        return queryData;
    }

    return (
        <div className="view-client">
            <div className="section">
                <Button variant="primary" onClick={onClickCreateButtonHandler}>Create</Button>
            </div>
            <div className="client-table">
                <ClientTable query={parseQueryData()} />
            </div>
        </div>
    );
};

export default ViewClient;
