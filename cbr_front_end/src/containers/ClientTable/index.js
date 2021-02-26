import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from 'axios';
import ClientInfoCard from "../../components/ClientInfoCard";
import Table from "../../components/Table";
import Button from 'react-bootstrap/Button';
import DropdownList from "../../components/DropdownList";
import ServerConfig from "../../config/ServerConfig";
import Spinner from 'react-bootstrap/Spinner';
import TextInputField from "../../components/TextInputField";
import "./style.css";

const ClientTable = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [clients, setClients] = useState([]);
    const [hasMoreClients, setHasMoreClients] = useState(true);
    const intersectionObserver = useRef();
    const observeeElement = useRef();

    const firstPage = 1;
    const [currentPage, setCurrentPage] = useState(firstPage);
    const clientsPerPage = 10;

    const defaultSortBy = "default";
    const [sortBy, setSortBy] = useState(defaultSortBy);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchKeywordBuffer, setSearchKeywordBuffer] = useState("");

    const getSortByList = () => {
        return {
            "Default": defaultSortBy,
            "ID": "id",
            "First Name": "firstName",
            "Last Name": "lastName",
            "Location": "location",
            "Village No.": "villageNumber",
            "Gender": "gender",
            "Risk": "risk",
            "Disability": "disability",
            "Age": "age",
        };
    };

    const getPageableByPage = page => {
        return {
            page: page,
            clientsPerPage: clientsPerPage,
        }
    };

    const requestClientsByPageable = useCallback(pageable => {
        const { page, clientsPerPage } = pageable;
        setIsLoading(true);
        axios.get(
            ServerConfig.api.url + "/api/v1/client/" + "pageNumber/" + page + "/pageSize/" + clientsPerPage
        )
            .then(response => {
                const receivedClients = response.data.data.content;
                updateClients(receivedClients);
                incrementPage();
            })
            .catch(error => {

            })
            .then(() => {
                setIsLoading(false);
            });
    }, [searchKeyword, sortBy]);

    // TODO: This function will be used in the future when syntax search is implemented
    const convertToParameterString = paramKeyValues => {
        let paramString = "";
        let isFirstParam = true;
        for (const key in paramKeyValues) {
            const paramValue = paramKeyValues[key];
            if (paramValue === undefined) {
                continue;
            }
            if (!isFirstParam) {
                paramString = paramString + "&";
            }
            paramString = paramString + key + "=";
            paramString = paramString + paramValue;
            isFirstParam = false;
        }
        return paramString;
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

        setUpInfiniteScroll();
        return disconnectIntersectionObserver;
    }, [hasMoreClients, currentPage, requestClientsByPageable]);

    const mapClientToTableData = clients => {
        const data = [];
        for (const index in clients) {
            const row = {};
            row["Clients"] = <ClientInfoCard client={clients[index]} queryData={props.query} />;
            data.push(row);
        }
        return data;
    };

    const onChangeSortByHandler = event => {
        const sortByDropdown = event.target;
        const sortByValue = sortByDropdown.value;
        setCurrentPage(firstPage);
        setClients([]);
        setSortBy(sortByValue);
    };

    const onChangeSearchKeywordHandler = event => {
        const textField = event.target;
        const value = textField.value;
        // We use buffer here because we only send out the search keyword
        // when users finish typing.
        setSearchKeywordBuffer(value);
    };

    const onClickSearchHandler = event => {
        event.preventDefault();
        if (searchKeywordBuffer.length === 0) {
            return;
        }
        setCurrentPage(firstPage);
        setClients([]);
        setSearchKeyword(searchKeywordBuffer);
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
        <div className="client-table">
            <div className="action-group">
                <div className="section search">
                    <div className="search-text-input">
                        <TextInputField value={searchKeywordBuffer} onChange={onChangeSearchKeywordHandler} />
                    </div>
                    <div className="search-button">
                        <Button variant="secondary" onClick={onClickSearchHandler}>Search</Button>
                    </div>
                </div>
                <hr />
                <div className="section">
                    <span>Sort By: </span>
                    <DropdownList
                        dropdownName="sort-by"
                        dropdownListItemsKeyValue={getSortByList()}
                        value={sortBy}
                        onChange={onChangeSortByHandler}
                    />
                </div>
            </div>
            <div className="table">
                <Table headers={["Clients"]} data={mapClientToTableData(clients)} />
            </div>
            <div className="infinite-scroll-observer" ref={element => observeeElement.current = element}>
            </div>
            <div className="spinner">
                {showSpinnerWhenIsLoading(isLoading)}
            </div>
            <div className="no-more-clients">
                {!hasMoreClients ? "No more clients" : null}
            </div>
        </div>
    );
};

export default ClientTable;
