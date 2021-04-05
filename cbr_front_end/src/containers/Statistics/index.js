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
    const [countHealthRisks, setCountHealthRisks] = useState([]);
    const [countSocialRisks, setCountSocialRisks] = useState([]);
    const [countEducationRisks, setCountEducationRisks] = useState([]);
    const [countDisabilities, setCountDisabilities] = useState([]);

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

    const getCountHealthRisk = () => {
        const requestHeader = {
            token: getToken()
        };
        axios.get(
            ServerConfig.api.url + "/api/v1/statistics/countHealthRisk",
            {
                headers: requestHeader,
            }
        )
        .then(response => {
            setCountHealthRisks(response.data.data[0]);
        });
    };

    const getCountSocialRisk = () => {
        const requestHeader = {
            token: getToken()
        };
        axios.get(
            ServerConfig.api.url + "/api/v1/statistics/countSocialRisk",
            {
                headers: requestHeader,
            }
        )
        .then(response => {
            setCountSocialRisks(response.data.data[0]);
        });
    };

    const getCountEducationRisk = () => {
        const requestHeader = {
            token: getToken()
        };
        axios.get(
            ServerConfig.api.url + "/api/v1/statistics/countEducationRisk",
            {
                headers: requestHeader,
            }
        )
        .then(response => {
            setCountEducationRisks(response.data.data[0]);
        });
    };

    const getCountDisabilities = () => {
        const requestHeader = {
            token: getToken()
        };
        axios.get(
            ServerConfig.api.url + "/api/v1/statistics/countDisabilities",
            {
                headers: requestHeader,
            }
        )
        .then(response => {
            setCountDisabilities(response.data.data[0]);
        });
    };

    useEffect(()=> {
        getCountByZone();
        getCountByWorker();
        getCountAll();
        getCountHealthRisk();
        getCountSocialRisk();
        getCountEducationRisk();
        getCountDisabilities();
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
            return null;
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
        if(countHealthRisks === undefined || countHealthRisks.length === 0) {
            return null;
        }
        else {
            for (const index in countHealthRisks) {
                statTableComponents.push(<tr>
                                            <td>{countHealthRisks[index]["name"]}</td>
                                            <td>{countHealthRisks[index]["criticalCount"]}</td>
                                            <td>{countHealthRisks[index]["highCount"]}</td>
                                            <td>{countHealthRisks[index]["mediumCount"]}</td>
                                            <td>{countHealthRisks[index]["lowCount"]}</td>
                                         </tr>
                                        );
            }
            return statTableComponents;
        }
    };

    const createStatTableComponents5 = () => {
        const statTableComponents = [];
        if(countSocialRisks === undefined || countSocialRisks.length === 0) {
            return null;
        }
        else {
            for (const index in countSocialRisks) {
                statTableComponents.push(<tr>
                                            <td>{countSocialRisks[index]["name"]}</td>
                                            <td>{countSocialRisks[index]["criticalCount"]}</td>
                                            <td>{countSocialRisks[index]["highCount"]}</td>
                                            <td>{countSocialRisks[index]["mediumCount"]}</td>
                                            <td>{countSocialRisks[index]["lowCount"]}</td>
                                         </tr>
                                        );
            }
            return statTableComponents;
        }
    };

    const createStatTableComponents6 = () => {
        const statTableComponents = [];
        if(countEducationRisks === undefined || countEducationRisks.length === 0) {
            return null;
        }
        else {
            for (const index in countEducationRisks) {
                statTableComponents.push(<tr>
                                            <td>{countEducationRisks[index]["name"]}</td>
                                            <td>{countEducationRisks[index]["criticalCount"]}</td>
                                            <td>{countEducationRisks[index]["highCount"]}</td>
                                            <td>{countEducationRisks[index]["mediumCount"]}</td>
                                            <td>{countEducationRisks[index]["lowCount"]}</td>
                                         </tr>
                                        );
            }
            return statTableComponents;
        }
    };

    const createStatTableComponents7 = () => {
        const statTableComponents = [];
        if(countDisabilities === undefined || countDisabilities.length === 0) {
            return null;
        }
        else {
            for (const index in countDisabilities) {
                statTableComponents.push(<tr>
                                            <td>{countDisabilities[index]["name"]}</td>
                                            <td>{countDisabilities[index]["a"]}</td>
                                            <td>{countDisabilities[index]["b"]}</td>
                                            <td>{countDisabilities[index]["c"]}</td>
                                            <td>{countDisabilities[index]["d"]}</td>
                                            <td>{countDisabilities[index]["e"]}</td>
                                            <td>{countDisabilities[index]["f"]}</td>
                                            <td>{countDisabilities[index]["g"]}</td>
                                            <td>{countDisabilities[index]["h"]}</td>
                                            <td>{countDisabilities[index]["i"]}</td>
                                            <td>{countDisabilities[index]["j"]}</td>
                                         </tr>
                                        );
            }
            return statTableComponents;
        }
    };

    const createTotal = () => {
        if(countAll === undefined || countAll.length === 0) {
            return null;
        } else {
            return (
                <tr>
                    <td>{countAll[0]["name"]}</td>
                    <td>{countAll[0]["clientCount"]}</td>
                    <td>{countAll[0]["visitCount"]}</td>
                    <td>{countAll[0]["referralCount"]}</td>
                    <td>{countAll[0]["outstandingReferralCount"]}</td>
                 </tr>
             );
        }
    };

    return (
        <div className="statistics">
            <div className="statistics-title">
                Statistics
            </div>
            <hr />
            <div>
                <h5>General Stats:</h5>
                <Table striped bordered size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Clients</th>
                            <th>Visits</th>
                            <th>Referrals</th>
                            <th>Outstanding Referrals</th>
                        </tr>
                    </thead>
                    <tbody>
                        {createTotal()}
                    </tbody>
                </Table>
            </div>
            <div>
                <h5>General Stats By Zone:</h5>
                <Table striped bordered size="sm">
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
                <h5>General Stats By Worker:</h5>
                <Table striped bordered size="sm">
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
                <h5>Health Risk Stats By Zone:</h5>
                <Table striped bordered size="sm">
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
            <div>
                <h5>Social Risk Stats By Zone:</h5>
                <Table striped bordered size="sm">
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
                        {createStatTableComponents5()}
                    </tbody>
                </Table>
            </div>
            <div>
                <h5>Education Risk Stats By Zone:</h5>
                <Table striped bordered size="sm">
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
                        {createStatTableComponents6()}
                    </tbody>
                </Table>
            </div>
            <div>
                <h5>Disabilities By Zone:</h5>
                <Table striped bordered size="sm">
                    <thead>
                        <tr>
                            <th>Zone</th>
                            <th>d1</th>
                            <th>d2</th>
                            <th>d3</th>
                            <th>d4</th>
                            <th>d5</th>
                            <th>d6</th>
                            <th>d7</th>
                            <th>d8</th>
                            <th>d9</th>
                            <th>d10</th>
                        </tr>
                    </thead>
                    <tbody>
                        {createStatTableComponents7()}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Statistics;
