import React, { useCallback, useEffect, useRef, useState } from "react";
import { getToken } from "../../utils/AuthenticationUtil";
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
    const clientsPerPage = 20;

    const defaultSortBy = "id";
    const defaultSearchBy = "cbrWorkerId"
    const [sortBy, setSortBy] = useState(defaultSortBy);
    const [isSortAscending, setIsSortAscending] = useState(true);
    const [searchBy, setSearchBy] = useState(defaultSearchBy);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchKeywordBuffer, setSearchKeywordBuffer] = useState("");

    const getAscendingText = () => {
        if (isSortAscending){
            return "Ascending";
        }
        return "Descending";
    }

    const sortType = {
        "BIRTHDATE": "birthdate",
    };
        
    const getSearchByList = () => {
        return {
            "CBR Worker ID": "cbrWorkerId",
            "First Name": "firstName",
            "Last Name": "lastName",
            "Zone": "zone",
            "Village No.": "villageNumber",
        };
    }

    const getSortByList = () => {
        return {
            "ID": "id",
            "First Name": "firstName",
            "Last Name": "lastName",
            "Location": "zoneName",
            "Village No.": "villageNumber",
            "Gender": "gender",
            "Risk": "riskHistories",
            "Age": "birthdate",
        };
    };

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
        
        const { page, clientsPerPage, sortBy, isSortAscending, searchBy, searchKeywordBuffer } = pageable;
        let getUrlCall = ServerConfig.api.url + "/api/v1/client/pageNumber/" + page + "/pageSize/" + clientsPerPage + "/sortBy/" + sortBy + "/ascending/" + isSortAscending;
        if (searchKeywordBuffer !== ""){
            getUrlCall = ServerConfig.api.url + "/api/v1/client/pageNumber/" + page + "/pageSize/" + clientsPerPage + "/filterBy/" + searchBy + "/searchBy/" + searchKeywordBuffer + "/sortBy/" + sortBy + "/ascending/" + isSortAscending;
        }
        const requestHeader = {
            token: getToken()
        };
        setIsLoading(true);
        axios.get(
                getUrlCall,
                {
                    headers: requestHeader,
                }
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
    }, [searchKeyword, sortBy]); // TODO: Will use searchKeyword and sortBy dependencies

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

    const reverseArray = (array) => {
        var reverseArray = array.reverse();
        return reverseArray;

    }

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

        if (sortBy === (sortType.BIRTHDATE)){
            updateClients(reverseArray(clients));
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

    const onClickIsAscendingHandler = () => {
        setIsSortAscending(!isSortAscending);
        setCurrentPage(firstPage);
        setClients([]);
    }

    const onChangeSearchByHandler = event => {
        const searchByDropdown = event.target;
        const searchByValue = searchByDropdown.value;
        setSearchBy(searchByValue);
    };

    const onChangeSortByHandler = event => {
        const sortByDropdown = event.target;
        const sortByValue = sortByDropdown.value;
        setCurrentPage(firstPage);
        setSortBy(sortByValue);
        setClients([]);
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
        setSearchKeyword(searchKeywordBuffer);
        setCurrentPage(firstPage);
        setClients([]);
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
                <div className="section">
                </div>
                <div className="section search">
                    <div className="search-text-input">
                        <TextInputField value={searchKeywordBuffer} onChange={onChangeSearchKeywordHandler} />
                    </div>
                    <div className="search-action">
                        <div className="search-dropdown">
                            <DropdownList
                                dropdownName="search-by"
                                dropdownListItemsKeyValue={getSearchByList()}
                                value={searchBy}
                                onChange={onChangeSearchByHandler}
                            />
                        </div>
                        <div className="search-button">
                            <Button variant="primary" onClick={onClickSearchHandler}>Search</Button> 
                        </div>
                    </div>
                </div>
                <hr />
                <div className="section">
                    <span>Sort By: </span>
                    <div className="sortBy">
                        <DropdownList
                            dropdownName="sort-by"
                            dropdownListItemsKeyValue={getSortByList()}
                            value={sortBy}
                            onChange={onChangeSortByHandler}
                            className={"sortBy"}
                        />
                        <Button 
                            className="text-center isAscendingBtn" 
                            variant="primary"
                            onClick={onClickIsAscendingHandler}
                        >
                            {getAscendingText()}
                        </Button>
                    </div>
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
