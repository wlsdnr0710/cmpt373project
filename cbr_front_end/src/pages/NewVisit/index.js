import React from 'react';
import { doAuthentication, isAuthenticated } from "../../utils/AuthenticationUtil";
import NewVisitForm from "../../containers/NewVisitForm";
import "./style.css";

const NewVisits = props => {
    doAuthentication(props.history);

    // If users accidentally enter this url by typing it directly or clicking backward button,
    // props.location.state will be null, so we should redirect users back to Dashboard
    if (!props.location.state) {
        // If user is not authenticated, doAuthentication() has already redirected user
        // Otherwise, we need to redirect user here.
        if (isAuthenticated()) {
            props.history.push("/dashboard");
        }
        return null;
    }

    return (
        <div className="">
            <NewVisitForm name={props.name} clientID={props.location.state.clientID} />
        </div>
    );
}

export default NewVisits;