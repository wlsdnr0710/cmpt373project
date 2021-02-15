import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import ClientInfoCard from "../../components/ClientInfoCard";
import Table from "../../components/Table";

const ClientTable = ({ searchKeyword, sortBy }) => {
    const [clients, setClients] = useState([]);
    const [hasMoreClients, setHasMoreClients] = useState(true);
    const intersectionObserver = useRef();
    const observeeElement = useRef();

    const [currentPage, setCurrentPage] = useState(1);
    const clientsPerPage = 10;

    const getPageableByPage = page => {
        return {
            page: page,
            clientsPerPage: clientsPerPage,
        }
    };

    const requestClientsByPageable = pageable => {
        const { page, clientsPerPage } = pageable;
        axios.get("http://localhost:8080/api/v1/client?page=" + page + "&clientsPerPage=" + clientsPerPage)
            .then(response => {
                const receivedClients = response.data.data;
                updateClients(receivedClients);
                incrementPage();
            })
            .catch(error => {

            })
            .then(() => {

            });
    };

    const updateClients = receivedClients => {
        setClients(prevClients => {
            if (receivedClients.length === 0) {
                setHasMoreClients(false);
                return prevClients;
            }
            const newClients = [...prevClients, ...receivedClients];
            return newClients;
        });
    };

    const incrementPage = () => {
        setCurrentPage(prevPage => {
            return prevPage + 1;
        });
    };

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
            const pageable = getPageableByPage(currentPage);
            requestClientsByPageable(pageable);
        };

        const disconnectIntersectionObserver = () => {
            if (intersectionObserver.current) {
                intersectionObserver.current.disconnect();
            }
        };

        setUpInfiniteScroll();
        return disconnectIntersectionObserver;
    }, [hasMoreClients, currentPage]);

    const mapClientToTableData = clients => {
        const data = [];
        for (const index in clients) {
            const row = {};
            row["Clients"] = <ClientInfoCard client={clients[index]} />;
            data.push(row);
        }
        return data;
    };

    return (
        <div className="client-table">
            <div className="table">
                <Table headers={["Clients"]} data={mapClientToTableData(clients)} />
            </div>
            <div className="infinite-scroll-observer" ref={element => observeeElement.current = element }>
            </div>
        </div>
    );
};

export default ClientTable;
