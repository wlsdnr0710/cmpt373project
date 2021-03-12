import React from "react";
import { useHistory } from 'react-router-dom';
import "./style.css";

const displayIcon = (iconSource, iconAlt) => {
    const entryIncludesIcon = iconSource !== undefined && iconAlt !== undefined;
    if (entryIncludesIcon) {
      return <img className="icon" src={iconSource} alt={iconAlt} />;
    }
};

const MobileNavigationBarEntry = ({ label, destination, iconSource, iconAlt, query }) => {
    let history = useHistory();
    const OnClickNavigationHandler = () => {
      if (query !== "#") {
        history.push(destination + "?query=" + query);
      } else if (destination !== "#") {
        history.push(destination)
      }
    }
    return (
        <div className="mobile-navigation-entry" onClick={OnClickNavigationHandler}>
            {displayIcon(iconSource, iconAlt)}
            <div className="text">{label}</div>
        </div>
    );
};

export default MobileNavigationBarEntry;
