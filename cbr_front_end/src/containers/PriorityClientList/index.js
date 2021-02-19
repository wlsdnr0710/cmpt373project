import React, { useEffect, useState } from "react";
import "./style.css";
import PriorityClient from '../../components/PriorityClient';

const PriorityClientList = () => {
    const [priorityClients, setPriorityClients] = useState([]);
    const priorityClientsClientComponents = [];

    const getPriorityClients = () => {
        //TODO: Replace with API call for priorty patients. 
        setPriorityClients([
            {
                "Name": "Patrick Taban",
                "Risk": "Critical Health Risk",
                "Zone": "Bidibidi Zone 1",
                "Date": "01/10/2020",
            }, 
            {
                "Name": "Isaac Woolyan",
                "Risk": "High Education Risk / High Social Risk",
                "Zone": "Bidibidi Zone 2",
                "Date": "01/10/2021",
            },
            {
                "Name": "Agnes Kenyi",
                "Risk": "Critical Health Risk / High Social Risk",
                "Zone": "Bidibidi Zone 3",
                "Date": "12/12/2020",
            },
            {
                "Name": "Jane Doe",
                "Risk": "Medium Health Risk",
                "Zone": "Bidibidi Zone 1",
                "Date": "11/23/2020",
            },
            {
                "Name": "John Smith",
                "Risk": "Medium Education Risk",
                "Zone": "Bidibidi Zone 3",
                "Date": "10/16/2020",
            },
        ]);
    };

    useEffect(()=> {
        getPriorityClients();
    }, []);

    const createPriorityClientListComponents = () => {
        if(!priorityClients) {
            return <p>Currently there isn't any priority client.</p>;
        }
        for (const index in priorityClients) {
            priorityClientsClientComponents.push(<PriorityClient number={index} client={priorityClients[index]}/>);
        }
        return priorityClientsClientComponents;
    };

    return (
        <div className='priority-client-list'>
            <h4>Priority Clients:</h4> 
            {createPriorityClientListComponents()}
        </div>
    );
};

export default PriorityClientList;
