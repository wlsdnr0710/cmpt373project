import React, { useEffect, useState } from "react";
import Table from "../../components/Table";

// TODO: Remove this function after we have implemented API to get clients.
const generateDummyClients = () => {
    const numberOfClients = 10;
    const clients = [];
    const dateOptions = {year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date();
    const dateString = date.toLocaleDateString("en-us", dateOptions);
    for (let i = 0; i < numberOfClients; i++) {
        const client = {};

        client["ID"] = i;
        client["First Name"] = "Yi Ching";
        client["Last Name"] = "Chou";
        client["Location"] = "BidiBidi Zone 1";
        client["Gender"] = "male";
        client["Age"] = 21;
        client["Village Number"] = 1;
        client["Contact Number"] = "778-3333-3333"
        client["Date"] = dateString;

        clients.push(client);
    }
    return clients;
};

const getClientTableHeaders = () => {
    return [
        "ID",
        "First Name",
        "Last Name",
        "Location",
        "Gender",
        "Age",
        "Village Number",
        "Contact Number",
        "Date",
    ];
}

const ClientTable = () => {
    const [clients, setClients] = useState([]);

    // TODO: Set clients here to test the asynchronous update.
    // Need to replace this with an axios call to get clients
    // after the GET clients API is implemented.
    useEffect(() => {
        const clients = generateDummyClients();
        setClients(clients);
    }, []);

    const tableHeaders = getClientTableHeaders();
    return (
        <div>
            <Table headers={tableHeaders} data={clients} />
        </div>
    );
};

export default ClientTable;
