import React, { useEffect, useState } from "react";
import axios from 'axios';
import ServerConfig from '../../config/ServerConfig';
import { getToken } from "../../utils/AuthenticationUtil";
import StatsTable from "../../components/StatsTable";
import Table from 'react-bootstrap/Table';
import "./style.css";

const Statistics = () => {
    const [visitsCounts, setVisitsCounts] = useState([]);

    const getVisitCount = () => {
        const requestHeader = {
            token: getToken()
        };
        axios.get(
            ServerConfig.api.url + "/api/v1/visit/count",
            {
                headers: requestHeader,
            }
        )
        .then(response => {
            setVisitsCounts(response.data.data[0]);
        });
    };

    useEffect(()=> {
        getVisitCount();
    }, []);

    const createPriorityClientListComponents = () => {
        const statTableComponents = [];
        if(visitsCounts === undefined || visitsCounts.length === 0) {
            return (<p>Currently there are no stats.</p>);
        }
        else {
            for (const index in visitsCounts) {
                statTableComponents.push(<StatsTable number={index} stat={visitsCounts[index]} key={index}/>);
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
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Visit Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {createPriorityClientListComponents()}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Statistics;
