import React, { useEffect, useState } from "react";
import axios from 'axios';
import ServerConfig from '../../config/ServerConfig';
import { getToken } from "../../utils/AuthenticationUtil";
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
                console.log(response.data.data[0]);
            });

    };

    useEffect(()=> {
        getVisitCount();
    }, []);

    const createPriorityClientListComponents = () => {
        const priorityClientsClientComponents = [];
        if(visitsCounts === undefined || visitsCounts.length === 0) {
            return (<p>Currently there are no priority clients.</p>);
        }
        else {
            for (const index in visitsCounts) {
                priorityClientsClientComponents.push(<span>{visitsCounts[index]["name"]}: {visitsCounts[index]["count"]}key={index}</span>);
            }
            return priorityClientsClientComponents;
        }
    };

    return (
        <div className="statistics">
            <div className="statistics-title">
                Statistics
            </div>
            <div>
                {createPriorityClientListComponents()}
            </div>
        </div>
    );
};

export default Statistics;
