import React, { useEffect, useState } from "react";
import axios from 'axios';
import ServerConfig from '../../config/ServerConfig';
import { getToken } from "../../utils/AuthenticationUtil";
import StatsTable from "../../components/StatsTable";
import Table from 'react-bootstrap/Table';
import "./style.css";

const Statistics = () => {
    const [countByZone, setCountByZone] = useState([]);

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

    useEffect(()=> {
        getCountByZone();
    }, []);

    const createStatTableComponents = () => {
        const statTableComponents = [];
        if(countByZone === undefined || countByZone.length === 0) {
            return (<p>Currently there are no stats.</p>);
        }
        else {
            for (const index in countByZone) {
                statTableComponents.push(<StatsTable number={index} stat={countByZone[index]} key={index}/>);
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
        </div>
    );
};

export default Statistics;
