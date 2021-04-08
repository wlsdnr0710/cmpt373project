import React, { useCallback, useEffect, useRef, useState } from "react";
import { getToken } from "../../utils/AuthenticationUtil";
import axios from 'axios';
import WorkerInfoCard from "../../components/WorkerInfoCard";
import Table from "../../components/Table";
import ServerConfig from "../../config/ServerConfig";
import Spinner from 'react-bootstrap/Spinner';

import "./style.css";

const WorkerList = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [clients, setClients] = useState([]);
    const [showedWorkers, setShowedWorkers] = useState([]);
    const [hasMoreClients, setHasMoreClients] = useState(true);
    const intersectionObserver = useRef();
    const observeeElement = useRef();
    const firstPage = 1;
    const [currentPage, setCurrentPage] = useState(firstPage - 1);
    const [loadedWorkers, setLoadedWorkers] = useState(firstPage);
    const clientsPerPage = 5;

    const getPageableByPage = page => {
        return {
            page: page,
            clientsPerPage: clientsPerPage,
        }
    };

    const requestClientsByPageable = useCallback(pageable => {
        const requestHeader = {
            token: getToken()
        };
        setIsLoading(true);
        axios.get(
            ServerConfig.api.url + "/api/v1/worker",
                {
                    headers: requestHeader,
                }
            )
            .then(response => {
                const receivedClients = response.data.data;
                console.log(receivedClients)
                updateClients(receivedClients);          
                incrementLoad();
            })
            .catch(error => {

            })
            .then(() => {
                setIsLoading(false);
            });
    }, []); 

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

    const incrementLoad = () => {
        setLoadedWorkers(prevLoad => {
            return prevLoad + 1;
        });
    };

    const splitArrayFromClientsToShowedWorkers = (min, max) => {
        console.log(clients.slice(min, max));
        const slicedWorkersArr = clients.slice(min, max);
        setShowedWorkers(slicedWorkersArr);
        console.log(showedWorkers);
    }

    useEffect(() => {

        const disconnectIntersectionObserver = () => {
            if (intersectionObserver.current) {
                intersectionObserver.current.disconnect();
            }
        };

        if (loadedWorkers === firstPage) {
            const pageable = getPageableByPage(loadedWorkers);
            requestClientsByPageable(pageable);
        }

        splitArrayFromClientsToShowedWorkers(currentPage, currentPage + clientsPerPage);
        return disconnectIntersectionObserver;
    }, [hasMoreClients, loadedWorkers, requestClientsByPageable]);

    const mapClientToTableData = clients => {
        const data = [];
        for (const index in clients) {
            const row = {};
            row["Workers"] = <WorkerInfoCard client={clients[index]} queryData={props.query} />;
            data.push(row);
        }
        return data;
    };

    const showSpinnerWhenIsLoading = isLoading => {
        if (isLoading) {
            return (
                <Spinner
                    className="spinner"
                    variant="primary"
                    as="div"
                    animation="grow"
                    size="lg"
                    role="status"
                    aria-hidden="true"
                />
            );
        } else {
            return null;
        }
    };

    return (
        <div className="worker-list">
            <div className="worker-list-title">
                Worker List
            </div>
            <div className="table">
                <Table headers={["Workers"]} data={mapClientToTableData(showedWorkers)} />
            </div>
            <div className="infinite-scroll-observer" ref={element => observeeElement.current = element}>
            </div>
            <div className="spinner">
                {showSpinnerWhenIsLoading(isLoading)}
            </div>
        </div>
    );
};

export default WorkerList;
