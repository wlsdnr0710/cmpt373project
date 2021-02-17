import React from "react";
import Button from 'react-bootstrap/Button';
import ClientTable from "../../containers/ClientTable";
import "./style.css";

const ViewClient = ({ history }) => {
    const onClickCreateButtonHandler = () => {
        history.push("/new-client");
    };

    return (
        <div className="view-client">
            <div className="section">
                <Button variant="primary" onClick={onClickCreateButtonHandler}>Create</Button>
            </div>
            <div className="client-table">
                <ClientTable />
            </div>
        </div>
    );
};

export default ViewClient;