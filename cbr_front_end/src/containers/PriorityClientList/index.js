import React, { useEffect, useState } from "react";
import axios from 'axios';
import ServerConfig from '../../config/ServerConfig';
import { getToken, getWorkerUsernameFromToken} from "../../utils/AuthenticationUtil";
import "./style.css";
import PriorityClient from '../../components/PriorityClient';

const PriorityClientList = () => {
    const [priorityClients, setPriorityClients] = useState([]);

    const getPriorityClients = () => {
        const requestHeader = {
            token: getToken()
        };
        axios.get(
            ServerConfig.api.url + "/api/v1/client/top5",
            {
                headers: requestHeader,
            }
        )
        .then(response => {
            setPriorityClients(response.data.data);
        });
    };

    useEffect(()=> {
        getPriorityClients();
    }, []);

    const createPriorityClientListComponents = () => {
        const priorityClientsClientComponents = [];
        if(priorityClients === undefined || priorityClients.length === 0) {
            return (<p>Currently there are no priority clients.</p>);
        }
        else {
            for (const index in priorityClients) {
                priorityClientsClientComponents.push(<PriorityClient number={index} client={priorityClients[index]} key={index}/>);
            }
            return priorityClientsClientComponents;
        }
    };

    return (
        <div className='priority-client-list'>
            <div className="priority-client-title">Priority Clients</div>
            {createPriorityClientListComponents()}
        </div>
    );
};

export default PriorityClientList;
