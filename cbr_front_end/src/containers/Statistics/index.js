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

    const getCountAll = () => {
        const requestHeader = {
            token: getToken()
        };
        axios.get(
            ServerConfig.api.url + "/api/v1/statistics/countAll",
            {
                headers: requestHeader,
            }
        )
        .then(response => {
            setCountAll(response.data.data[0]);
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

    useEffect(()=> {
        getCountByZone();
        getCountByWorker();
        getCountAll();
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
                                            <td>{countByWorker[index]["referralCount"]}</td>
                                            <td>{countByWorker[index]["outstandingReferralCount"]}</td>
                                         </tr>
                                        );
            }
            return statTableComponents;
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
                            <th></th>
                            <th>Clients</th>
                            <th>Visits</th>
                            <th>Referrals</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{countAll[index]["name"]}</td>
                            <td>{countAll[index]["clientCount"]}</td>
                            <td>{countAll[index]["visitCount"]}</td>
                            <td>{countAll[index]["referralCount"]}</td>
                         </tr>
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
                            <th>Referrals</th>
                            <th>Outstanding Referrals</th>
                        </tr>
                    </thead>
                    <tbody>
                        {createStatTableComponents3()}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Statistics;
