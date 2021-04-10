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
    const [countServices, setCountServices] = useState([]);

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

    const getCountServices = () => {
        const requestHeader = {
            token: getToken()
        };
        axios.get(
            ServerConfig.api.url + "/api/v1/statistics/countServices",
            {
                headers: requestHeader,
            }
        )
        .then(response => {
            setCountServices(response.data.data[0]);
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
        getCountServices();
    }, []);

    return (
        <div className="statistics">
            <div className="statistics-title">
                Statistics
            </div>
            <hr />
            <div>
                <h5>General Stats:</h5>
                <StatsTable values={countAll} />
            </div>
            <div>
                <h5>General Stats By Zone:</h5>
                <StatsTable values={countByZone} />
            </div>
            <div>
                <h5>General Stats By Worker:</h5>
                <StatsTable values={countByWorker} />
            </div>
            <div>
                <h5>Health Risk Stats:</h5>
                <StatsTable values={countHealthRisks} />
            </div>
            <div>
                <h5>Health Risk Stats:</h5>
                <StatsTable values={countSocialRisks} />
            </div>
            <div>
                <h5>Health Risk Stats:</h5>
                <StatsTable values={countEducationRisks} />
            </div>
            <div>
                <h5>Disabilities By Zone:</h5>
                <StatsTable values={countDisabilities} />
            </div>
            <div>
                <h5>Services By Zone:</h5>
                <StatsTable values={countServices} />
            </div>
        </div>
    );
};

export default Statistics;
