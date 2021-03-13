import React from "react";
import { useHistory } from 'react-router-dom';
import "./style.css";

const displayIcon = (iconSource, iconAlt) => {
  const entryIncludesIcon = iconSource !== undefined && iconAlt !== undefined;
  if (entryIncludesIcon) {
    return <img className="icon" src={iconSource} alt={iconAlt} />;
  }
};

//TODO: change if condition for destination in the future to reduce dependency
const NavigationBarEntry = ({ label, destination, iconSource, iconAlt, query }) => {
  let history = useHistory();
  const OnClickNavigationHandler = () => {
    if (destination !== "#") {
      if (query) {
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
