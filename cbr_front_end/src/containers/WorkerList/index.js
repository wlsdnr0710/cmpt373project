import React, { useCallback, useEffect, useRef, useState } from "react";
import { getToken } from "../../utils/AuthenticationUtil";
import { parseDateStringToEpoch, parseEpochToDateString } from "../../utils/Utilities";
import axios from 'axios';
import ClientInfoCard from "../../components/ClientInfoCard";
import Table from "../../components/Table";
import Button from 'react-bootstrap/Button';
import DropdownList from "../../components/DropdownList";
import ServerConfig from "../../config/ServerConfig";
import Spinner from 'react-bootstrap/Spinner';
import TextInputField from "../../components/TextInputField";
import "./style.css";

const WorkerList = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [clients, setClients] = useState([]);
    const [showedClients, setShowedClients] = useState([]);
    const [hasMoreClients, setHasMoreClients] = useState(true);
    const intersectionObserver = useRef();
    const observeeElement = useRef();

    const firstPage = 1;
    const [currentPage, setCurrentPage] = useState(firstPage);
    const clientsPerPage = 20;

    const defaultSortBy = "id";
    const defaultSearchBy = "cbrWorkerId"
    const [sortBy, setSortBy] = useState(defaultSortBy);
    const [isSortAscending, setIsSortAscending] = useState(true);
    const [searchBy, setSearchBy] = useState(defaultSearchBy);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchKeywordBuffer, setSearchKeywordBuffer] = useState("");


    const getPageableByPage = page => {
        return {
            page: page,
            clientsPerPage: clientsPerPage,
            sortBy: sortBy,
            isSortAscending: isSortAscending,
            searchBy : searchBy,
            searchKeywordBuffer :searchKeywordBuffer
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
                incrementPage();
            })
            .catch(error => {

            })
            .then(() => {
                setIsLoading(false);
            });
    }, [searchKeyword, sortBy]); 

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
                    disconnectIntersectionObserver();
                    loadMoreClientsAndSetHasMoreClients();
                }
            });
        };

        const loadMoreClientsAndSetHasMoreClients = () => {
            if (!hasMoreClients || currentPage === firstPage) {
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

        if (currentPage === firstPage) {
            const pageable = getPageableByPage(currentPage);
            requestClientsByPageable(pageable);
        }

        // setUpInfiniteScroll();
        return disconnectIntersectionObserver;
    }, [hasMoreClients, currentPage, requestClientsByPageable]);

    const mapClientToTableData = clients => {
        const data = [];
        for (const index in clients) {
            const row = {};
            row["Workers"] = <ClientInfoCard client={clients[index]} queryData={props.query} />;
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

    const formatDateString = date => {
        const epoch = parseDateStringToEpoch(date);
        const dateString = parseEpochToDateString(epoch);
        return dateString;
    };

    return (
        <div className="worker-list">
            <div className="worker-list-title">
                Worker List
            </div>
            <div className="table">
                <Table headers={["Workers"]} data={mapClientToTableData(clients)} />
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
