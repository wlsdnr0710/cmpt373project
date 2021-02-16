import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from 'axios';
import ClientInfoCard from "../../components/ClientInfoCard";
import Table from "../../components/Table";
import Button from 'react-bootstrap/Button';
import DropdownList from "../../components/DropdownList";
import TextInputField from "../../components/TextInputField";

const ClientTable = () => {
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
        axios.get(
                "http://localhost:8080/api/v1/client?" + convertToParameterString({
                    "page": page,
                    "clientsPerPage": clientsPerPage,
                    "searchKeyword": searchKeyword,
                    "sortBy": sortBy,
                })
            )
            .then(response => {
                const receivedClients = response.data.data;
                updateClients(receivedClients);
                incrementPage();
            })
            .catch(error => {

            })
            .then(() => {

            });
    }, [searchKeyword, sortBy]);

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
                    loadMoreClientsAndSetHasMoreClients();
                }
            });
        };
    
        const loadMoreClientsAndSetHasMoreClients = () => {
            if (!hasMoreClients || currentPage === 1) {
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

        if (currentPage === 1) {
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
            row["Clients"] = <ClientInfoCard client={clients[index]} />;
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
            <div className="infinite-scroll-observer" ref={element => observeeElement.current = element }>
            </div>
        </div>
    );
};

export default ClientTable;
