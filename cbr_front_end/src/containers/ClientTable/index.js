import React, { useEffect, useRef, useState } from "react";
import ClientInfoCard from "../../components/ClientInfoCard";
import Table from "../../components/Table";

// TODO: Remove this function after we have implemented API to get clients.
const generateDummyClients = () => {
    const numberOfClients = 5;
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
        "Clients",
    ];
}

const getClientTableData = clients => {
    const data = [];
    for (const index in clients) {
        const row = {};
        row["Clients"] = <ClientInfoCard client={clients[index]} />;
        data.push(row);
    }
    return data;
};

const ClientTable = () => {
    const [clients, setClients] = useState([]);
    const [hasMoreClients, setHasMoreClients] = useState(true);
    const intersectionObserver = useRef();
    const observeeElement = useRef();

    // TODO: To test infinite scroll when there is no more clients to load.
    // Remove this after back-end API is implemented.
    const loadMoreClientLimit = 2;
    const loadMoreClientCounter = useRef(0);

    // TODO: Set clients here to test the asynchronous update.
    // Need to replace this with an axios call to get clients
    // after the GET clients API is implemented.
    useEffect(() => {    
        const setUpInfiniteScroll = () => {
            intersectionObserver.current = new IntersectionObserver(infScrollIntersecObserverCallBack);
            intersectionObserver.current.observe(observeeElement.current);
        };
    
        const infScrollIntersecObserverCallBack = entries => {
            entries.forEach(entry => {
                const { isIntersecting } = entry;
                if (isIntersecting) {
                    loadMoreClientsAndSetHasMoreClients();
                }
            });
        };
    
        const loadMoreClientsAndSetHasMoreClients = () => {
            if (!hasMoreClients) {
                return;
            }
            setClients(prevClients => {
                // TODO: replace generateDummyClients() with API call
                const moreClients = generateDummyClients();
                if (moreClients.length === 0) {
                    setHasMoreClients(false);
                    return;
                }
                const clients = [...prevClients, ...moreClients];
                return clients;
            });

            // TODO: To test infinite scroll when there is no more clients to load.
            // Remove this after back-end API is implemented.
            if (loadMoreClientCounter.current > loadMoreClientLimit) {
                setHasMoreClients(false);
            }
            loadMoreClientCounter.current++;    
        };

        const disconnectIntersectionObserver = () => {
            if (intersectionObserver.current) {
                intersectionObserver.current.disconnect();
            }
        };

        setUpInfiniteScroll();
        return disconnectIntersectionObserver;
    }, [hasMoreClients]);

    const tableHeaders = getClientTableHeaders();
    return (
        <div className="client-table">
            <div className="table">
                <Table headers={tableHeaders} data={getClientTableData(clients)} />
            </div>
            <div className="infinite-scroll-observer" ref={element => observeeElement.current = element }>
            </div>
        </div>
    );
};

export default ClientTable;
