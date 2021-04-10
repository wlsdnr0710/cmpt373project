import React, { useEffect, useState } from "react";
import axios from 'axios';
import ServerConfig from '../../config/ServerConfig';
import { getToken } from "../../utils/AuthenticationUtil";
import {
    getGeneralStatsFromServer,
    getGeneralStatsByZoneFromServer,
    getGeneralStatsByWorkerFromServer,
    getHealthRiskStatsFromServer,
    getSocialRiskStatsFromServer,
    getEducationRiskStatsFromServer,
    getDisabilityStatsFromServer,
    getServiceStatsFromServer
} from "../../utils/Utilities";
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

    const getCountByZone = () => {
        const requestHeader = {
            token: getToken()
        };
        getGeneralStatsByZoneFromServer(requestHeader)
        .then(response => {
            setCountByZone(response.data.data[0]);
        });
    };

    const getCountByWorker = () => {
        const requestHeader = {
            token: getToken()
        };
        getGeneralStatsByWorkerFromServer(requestHeader)
        .then(response => {
            setCountByWorker(response.data.data[0]);
        });
    };

    const getCountHealthRisk = () => {
        const requestHeader = {
            token: getToken()
        };
        getHealthRiskStatsFromServer(requestHeader)
        .then(response => {
            setCountHealthRisks(response.data.data[0]);
        });
    };

    const getCountSocialRisk = () => {
        const requestHeader = {
            token: getToken()
        };
        getSocialRiskStatsFromServer(requestHeader)
        .then(response => {
            setCountSocialRisks(response.data.data[0]);
        });
    };

    const getCountEducationRisk = () => {
        const requestHeader = {
            token: getToken()
        };
        getEducationRiskStatsFromServer(requestHeader)
        .then(response => {
            setCountEducationRisks(response.data.data[0]);
        });
    };

    const getCountDisabilities = () => {
        const requestHeader = {
            token: getToken()
        };
        getDisabilityStatsFromServer(requestHeader)
        .then(response => {
            setCountDisabilities(response.data.data[0]);
        });
    };

    const getCountServices = () => {
        const requestHeader = {
            token: getToken()
        };
        getServiceStatsFromServer(requestHeader)
        .then(response => {
            setCountServices(response.data.data[0]);
        });
    };

    useEffect(()=> {
        getCountByZone();
        getCountByWorker();
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
                <StatsTable values={countByZone} title="General Stats By Zone" index="1"/>
            </div>
            <div>
                <StatsTable values={countByWorker} title="General Stats By Worker" index="2"/>
            </div>
            <div>
                <StatsTable values={countHealthRisks} title="Health Risk Stats" index="3"/>
            </div>
            <div>
                <StatsTable values={countSocialRisks} title="Social Risk Stats" index="4"/>
            </div>
            <div>
                <StatsTable values={countEducationRisks} title="Education Risk Stats" index="5"/>
            </div>
            <div>
                <StatsTable values={countDisabilities} title="Disabilities Stats" index="6"/>
            </div>
            <div>
                <StatsTable values={countServices} title="Services Provided Stats" index="7"/>
            </div>
        </div>
    );
};

export default Statistics;
