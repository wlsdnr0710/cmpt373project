import React from "react";
import "./style.css";

const displayIcon = (iconSource, iconAlt) => {
  const entryIncludesIcon = iconSource !== undefined && iconAlt !== undefined;
  if (entryIncludesIcon) {
    return <img className="icon" src={iconSource} alt={iconAlt} />;
  }
};

const NavigationBarEntry = ({ label, destination, iconSource, iconAlt }) => {
  return (
    <div className="navigation-entry">
        {displayIcon(iconSource, iconAlt)}
        <a className ="text"href={destination}>{label}</a>
    </div>
  );
};

export default NavigationBarEntry;
