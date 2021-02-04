import React, { useEffect, useState } from "react";
import ClientInfoCard from "../../components/ClientInfoCard";
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

        client.id = i;
        client.firstName = "Yi Ching";
        client.lastName = "Chou";
        client.location = "BidiBidi Zone 1";
        client.gender = "male";
        client.age = 21;
        client.villageNumber = 1;
        client.contactNumber = "778-3333-3333"
        client.date = dateString;

        clients.push(client);
    }
    return clients;
};

const getClientTableHeaders = () => {
    return [
        "Client",
    ];
}

const getClientTableData = clients => {
    const data = [];
    for (const index in clients) {
        const row = {};
        row["Client"] = <ClientInfoCard client={clients[index]} />;
        data.push(row);
    }
    return data;
};

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
            <Table headers={tableHeaders} data={getClientTableData(clients)} />
        </div>
    );
};

export default ClientTable;
