import React from "react";
import { useHistory } from 'react-router-dom';
import "./style.css";

const displayIcon = (iconSource, iconAlt) => {
  const entryIncludesIcon = iconSource !== undefined && iconAlt !== undefined;
  if (entryIncludesIcon) {
    return <img className="icon" src={iconSource} alt={iconAlt} />;
  }
};

const NavigationBarEntry = ({ label, destination, iconSource, iconAlt, query }) => {
  let history = useHistory();
  const OnClickNavigationHandler = () => {
    history.push(destination + "?query=" + query);
  }

  return (
    <div className="navigation-entry">
      {displayIcon(iconSource, iconAlt)}
      <div className="text" onClick={OnClickNavigationHandler} >{label}</div>
    </div>
  );
};

export default NavigationBarEntry;
