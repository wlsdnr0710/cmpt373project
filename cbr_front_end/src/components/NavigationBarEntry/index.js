import React from "react";
import { useHistory } from 'react-router-dom';
import { displayIcon } from '../../utils/Utilities';
import "./style.css";

const isQueryValid = query => {
    return query !== "#" && query !== "";
}

//TODO: change if condition for destination in the future to reduce dependency
const NavigationBarEntry = ({ label, destination, iconSource, iconAlt, query }) => {
    let history = useHistory();
    const OnClickNavigationHandler = () => {
        if (destination !== "#") {
            if (isQueryValid(query)) {
                history.push(destination + "?query=" + query);
            } else {
                history.push(destination)
            }
        }
    }

    return (
        <div className="navigation-entry" onClick={OnClickNavigationHandler}>
            {displayIcon(iconSource, iconAlt)}
            <div className="text">{label}</div>
        </div>
    );
};

export default NavigationBarEntry;
