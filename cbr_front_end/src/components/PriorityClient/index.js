import React from "react";
import "./style.css";

const PriorityClient = (props) => {
    // TODO: Process Risk level to Critical/High/Medium/Low if needed. 
    return (
        <div className='priority-client'>
            <p>{parseInt(props.number)+1}. {props.client.Name}, {props.client.Risk}, {props.client.Zone}, {props.client.Date}</p>
        </div>
    );
};


export default PriorityClient;
