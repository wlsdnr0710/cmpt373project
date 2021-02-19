import React from 'react';
import NewVisitForm from "../../containers/NewVisitForm";
import "./style.css";

const NewVisits = props => {
    return (
        <div className="">
            <NewVisitForm name={props.name} clientID={props.location.state.clientID} />
        </div>
    );
}

export default NewVisits;