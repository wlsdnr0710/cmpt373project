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
    }, []);

    const createStatTableComponents = () => {
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
                                         </tr>
                                        );
            }
            return statTableComponents;
        }
    };

    const createStatTableComponents2 = () => {
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
                            <th>Zone</th>
                            <th>Clients</th>
                            <th>Visits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {createStatTableComponents()}
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
                        {createStatTableComponents2()}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Statistics;
