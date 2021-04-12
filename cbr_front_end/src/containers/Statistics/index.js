import React, { useEffect, useState } from "react";
import { getToken } from "../../utils/AuthenticationUtil";
import {
    getGeneralStatsByZoneCountFromServer,
    getGeneralStatsByWorkerCountFromServer,
    getHealthRisksStatsByZoneCountFromServer,
    getSocialRisksStatsByZoneCountFromServer,
    getEducationRisksStatsByZoneCountFromServer,
    getDisabilitiesStatsByZoneCountFromServer,
    getHealthServicesStatsByZoneCountFromServer,
    getSocialServicesStatsByZoneCountFromServer,
    getEducationServicesStatsByZoneCountFromServer
} from "../../utils/Utilities";
import StatsTable from "../../components/StatsTable";
import "./style.css";

const Statistics = () => {
    const [countByZone, setCountByZone] = useState([]);
    const [countByWorker, setCountByWorker] = useState([]);
    const [countHealthRisks, setCountHealthRisks] = useState([]);
    const [countSocialRisks, setCountSocialRisks] = useState([]);
    const [countEducationRisks, setCountEducationRisks] = useState([]);
    const [countDisabilities, setCountDisabilities] = useState([]);
    const [countHealthServices, setCountHealthServices] = useState([]);
    const [countSocialServices, setCountSocialServices] = useState([]);
    const [countEducationServices, setCountEducationServices] = useState([]);

    const getCountByZone = () => {
        const requestHeader = {
            token: getToken()
        };
        getGeneralStatsByZoneCountFromServer(requestHeader)
        .then(response => {
            setCountByZone(response.data.data[0]);
        });
    };

    const getCountByWorker = () => {
        const requestHeader = {
            token: getToken()
        };
        getGeneralStatsByWorkerCountFromServer(requestHeader)
        .then(response => {
            setCountByWorker(response.data.data[0]);
        });
    };

    const getCountHealthRisk = () => {
        const requestHeader = {
            token: getToken()
        };
        getHealthRisksStatsByZoneCountFromServer(requestHeader)
        .then(response => {
            setCountHealthRisks(response.data.data[0]);
        });
    };

    const getCountSocialRisk = () => {
        const requestHeader = {
            token: getToken()
        };
        getSocialRisksStatsByZoneCountFromServer(requestHeader)
        .then(response => {
            setCountSocialRisks(response.data.data[0]);
        });
    };

    const getCountEducationRisk = () => {
        const requestHeader = {
            token: getToken()
        };
        getEducationRisksStatsByZoneCountFromServer(requestHeader)
        .then(response => {
            setCountEducationRisks(response.data.data[0]);
        });
    };

    const getCountDisabilities = () => {
        const requestHeader = {
            token: getToken()
        };
        getDisabilitiesStatsByZoneCountFromServer(requestHeader)
        .then(response => {
            setCountDisabilities(response.data.data[0]);
        });
    };

    const getCountHealthServices = () => {
        const requestHeader = {
            token: getToken()
        };
        getHealthServicesStatsByZoneCountFromServer(requestHeader)
        .then(response => {
            setCountHealthServices(response.data.data[0]);
        });
    };

    const getCountSocialServices = () => {
        const requestHeader = {
            token: getToken()
        };
        getSocialServicesStatsByZoneCountFromServer(requestHeader)
        .then(response => {
            setCountSocialServices(response.data.data[0]);
        });
    };

    const getCountEducationServices = () => {
        const requestHeader = {
            token: getToken()
        };
        getEducationServicesStatsByZoneCountFromServer(requestHeader)
        .then(response => {
            setCountEducationServices(response.data.data[0]);
        });
    };

    useEffect(()=> {
        getCountByZone();
        getCountByWorker();
        getCountHealthRisk();
        getCountSocialRisk();
        getCountEducationRisk();
        getCountDisabilities();
        getCountHealthServices();
        getCountSocialServices();
        getCountEducationServices();
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
                <StatsTable values={countHealthServices} title="Health Services Provided Stats" index="7"/>
            </div>
            <div>
                <StatsTable values={countSocialServices} title="Social Services Provided Stats" index="8"/>
            </div>
            <div>
                <StatsTable values={countEducationServices} title="Education Services Provided Stats" index="9"/>
            </div>
        </div>
    );
};

export default Statistics;
