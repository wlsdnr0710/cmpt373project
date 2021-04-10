import React, { useCallback, useEffect, useRef, useState } from "react";
import { getToken } from "../../utils/AuthenticationUtil";
import axios from 'axios';
import WorkerInfoCard from "../../components/WorkerInfoCard";
import Table from "../../components/Table";
import ServerConfig from "../../config/ServerConfig";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import "./style.css";

const WorkerList = (props) => {
    const [isWorkerListHidden, setIsWorkerListHidden] = useState(false);
    const [workerListTitle, setWorkerListTitle] = useState("- Worker List");
    const [isLoading, setIsLoading] = useState(true);
    const [workers, setWorkers] = useState([]);
    const [showedWorkers, setShowedWorkers] = useState([]);
    const [hasMoreWorkers, setHasMoreWorkers] = useState(true);

    const intersectionObserver = useRef();
    const observeeElement = useRef();

    const firstPage = 1;
    const workersPerPage = 5;
    const [isStartPage, setIsStartPage] = useState(false);
    const [isLastPage, setIsLastPage] = useState(false);
    const [currentPage, setCurrentPage] = useState(firstPage - 1);
    const [loadedWorkers, setLoadedWorkers] = useState(firstPage);

    const requestWorkers = useCallback(() => {
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
                const receivedWorkers = response.data.data;
                updateWorkers(receivedWorkers);          
                incrementLoad();
            })
            .catch(error => {

            })
            .then(() => {
                setIsLoading(false);
            });
    }, []); 

    const updateWorkers = receivedWorkers => {
        setWorkers(prevWorkers => {
            if (receivedWorkers.length === 0) {
                setHasMoreWorkers(false);
                return prevWorkers;
            }
            const newWorkers = [...prevWorkers, ...receivedWorkers];
            return newWorkers;
        });
    };

    const incrementLoad = () => {
        setLoadedWorkers(prevLoad => {
            return prevLoad + 1;
        });
    };

    const splitArrayFromWorkersToShowedWorkers = (min, max) => {
        const slicedWorkersArr = workers.slice(min, max);
        setShowedWorkers(slicedWorkersArr);
        updateBoolStartOrLastPage(min);
        
    }

    const updateBoolStartOrLastPage = (newPage) => {
        if (newPage + 1 === firstPage){
            setIsStartPage(true);
        }
        else {
            setIsStartPage(false);
        }
        if (newPage + workersPerPage >= workers.length){
        
            setIsLastPage(true);
        }
        else {
            setIsLastPage(false);
        }
    }

    useEffect(() => {
        const disconnectIntersectionObserver = () => {
            if (intersectionObserver.current) {
                intersectionObserver.current.disconnect();
            }
        };

        if (loadedWorkers === firstPage) {
            requestWorkers();
        }

        splitArrayFromWorkersToShowedWorkers(currentPage, currentPage + workersPerPage);
        return disconnectIntersectionObserver;
    }, [hasMoreWorkers, loadedWorkers, requestWorkers]);

    const mapWorkersToTableData = workers => {
        const data = [];
        for (const index in workers) {
            const row = {};
            row["Workers"] = <WorkerInfoCard worker={workers[index]} />;
            data.push(row);
        }
        return data;
    };

    const onClickNextPageHandler = () => {
        let newPage = currentPage + workersPerPage;
        setCurrentPage(newPage);
        splitArrayFromWorkersToShowedWorkers(newPage, newPage + workersPerPage);
    }

    const onClickPrevPageHandler = () => {
        let newPage = currentPage - workersPerPage;
        setCurrentPage(newPage);
        splitArrayFromWorkersToShowedWorkers(newPage, newPage + workersPerPage);
    }

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

    const onWorkerListTitleOnClick = () => {
        setIsWorkerListHidden(!isWorkerListHidden);
        if (isWorkerListHidden){
            setWorkerListTitle("- Worker List");
        }
        else {
            setWorkerListTitle("+ Worker List");
        }
    }

    return (
        <div className="worker-list">
            <div className="worker-list-title" onClick={onWorkerListTitleOnClick}>
                {workerListTitle}
            </div>
            <div className={"worker-list-table"} hidden={isWorkerListHidden}>
                <div className="table">
                    <Table headers={["Workers"]} data={mapWorkersToTableData(showedWorkers)} />
                </div>
                <div className="infinite-scroll-observer" ref={element => observeeElement.current = element}>
                </div>
                <div className="spinner">
                    {showSpinnerWhenIsLoading(isLoading)}
                </div>
                <div className="page-buttons">
                    <Button onClick={onClickNextPageHandler} hidden={isLastPage} className="ml-3">
                        Next Page
                    </Button>
                    <Button onClick={onClickPrevPageHandler} hidden={isStartPage} className="ml-3">
                        Prev Page
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default WorkerList;
