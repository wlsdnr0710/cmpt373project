import React from 'react';
import { doAuthentication } from "../../utils/AuthenticationUtil";
import NewVisitForm from "../../containers/NewVisitForm";
import "./style.css";

const NewVisits = props => {
    doAuthentication();
    return (
        <div className="">
            <NewVisitForm name={props.name} clientID={props.location.state.clientID} />
        </div>
    );
}

export default NewVisits;