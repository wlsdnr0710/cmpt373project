import React, { useEffect, useState } from "react";
import axios from 'axios';
import ServerConfig from '../../config/ServerConfig';
import { getToken } from "../../utils/AuthenticationUtil";
import StatsTable from "../../components/StatsTable";
import Table from 'react-bootstrap/Table';
import "./style.css";

const Statistics = () => {
    const [countByZone, setCountByZone] = useState([]);
    const [countByWorker, setCountByWorker] = useState([]);
    const [countAll, setCountAll] = useState([]);
    const [countRisks, setCountRisks] = useState([]);

    const getCountAll = () => {
        const requestHeader = {
            token: getToken()
        };
        axios.get(
            ServerConfig.api.url + "/api/v1/statistics/countRisks",
            {
                headers: requestHeader,
            }
        )
        .then(response => {
            setCountRisks(response.data.data[0]);
        });
    };

    const getCountByZone = () => {
        const requestHeader = {
            token: getToken()
        };
        axios.get(
            ServerConfig.api.url + "/api/v1/statistics/countByZone",
            {
                headers: requestHeader,
            }
        )
        .then(response => {
            setCountByZone(response.data.data[0]);
        });
    };

    const getCountByWorker = () => {
        const requestHeader = {
            token: getToken()
        };
        axios.get(
            ServerConfig.api.url + "/api/v1/statistics/countByWorker",
            {
                headers: requestHeader,
            }
        )
        .then(response => {
            setCountByWorker(response.data.data[0]);
        });
    };

    const getCountRisk = () => {
        const requestHeader = {
            token: getToken()
        };
        axios.get(
            ServerConfig.api.url + "/api/v1/statistics/countByWorker",
            {
                headers: requestHeader,
            }
        )
        .then(response => {
            setCountByWorker(response.data.data[0]);
        });
    };

    useEffect(()=> {
        getCountByZone();
        getCountByWorker();
        getCountAll();
        getCountRisk();
    }, []);

    const createStatTableComponents2 = () => {
        const statTableComponents = [];
        if(countByZone === undefined || countByZone.length === 0) {
            return (<p>Currently there are no stats.</p>);
        }
        else {
            for (const index in countByZone) {
                statTableComponents.push(<tr>
                                            <td>{countByZone[index]["name"]}</td>
                                            <td>{countByZone[index]["clientCount"]}</td>
                                            <td>{countByZone[index]["visitCount"]}</td>
                                            <td>{countByZone[index]["referralCount"]}</td>
                                         </tr>
                                        );
            }
            return statTableComponents;
        }
    };

    const createStatTableComponents3 = () => {
        const statTableComponents = [];
        if(countByWorker === undefined || countByWorker.length === 0) {
            return (<p>Currently there are no stats.</p>);
        }
        else {
            for (const index in countByWorker) {
                statTableComponents.push(<tr>
                                            <td>{countByWorker[index]["name"]}</td>
                                            <td>{countByWorker[index]["visitCount"]}</td>
                                            <td>{countByWorker[index]["referralCount"]}</td>
                                            <td>{countByWorker[index]["outstandingReferralCount"]}</td>
                                         </tr>
                                        );
            }
            return statTableComponents;
        }
    };

    const createStatTableComponents4 = () => {
        const statTableComponents = [];
        if(countRisks === undefined || countRisks.length === 0) {
            return (<p>Currently there are no stats.</p>);
        }
        else {
            for (const index in countRisks) {
                statTableComponents.push(<tr>
                                            <td>{countByWorker[index]["name"]}</td>
                                            <td>{countByWorker[index]["criticalCount"]}</td>
                                            <td>{countByWorker[index]["highCount"]}</td>
                                            <td>{countByWorker[index]["mediumCount"]}</td>
                                            <td>{countByWorker[index]["lowCount"]}</td>
                                         </tr>
                                        );
            }
            return statTableComponents;
        }
    };

    const createTotal = () => {
    console.log(countAll[0]);
    if(countAll === undefined || countAll.length === 0) {
        return null;
    } else {
        return (
            <tr>
                <td>{countAll[0]["name"]}</td>
                <td>{countAll[0]["clientCount"]}</td>
                <td>{countAll[0]["visitCount"]}</td>
                <td>{countAll[0]["referralCount"]}</td>
             </tr>
         );
     }
    };

    return (
        <div className="statistics">
            <div className="statistics-title">
                Statistics
            </div>
            <div>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Clients</th>
                            <th>Visits</th>
                            <th>Referrals</th>
                        </tr>
                    </thead>
                    <tbody>

                            {createTotal()}

                    </tbody>
                </Table>
            </div>
            <div>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Zone</th>
                            <th>Clients</th>
                            <th>Visits</th>
                            <th>Referrals</th>
                        </tr>
                    </thead>
                    <tbody>
                        {createStatTableComponents2()}
                    </tbody>
                </Table>
            </div>
            <div>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Worker</th>
                            <th>Visits</th>
                            <th>Referrals</th>
                            <th>Outstanding Referrals</th>
                        </tr>
                    </thead>
                    <tbody>
                        {createStatTableComponents3()}
                    </tbody>
                </Table>
            </div>
            <div>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Zone</th>
                            <th>Critical</th>
                            <th>High</th>
                            <th>Medium</th>
                            <th>Low</th>
                        </tr>
                    </thead>
                    <tbody>
                        {createStatTableComponents4()}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Statistics;
