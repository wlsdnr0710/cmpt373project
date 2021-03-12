import React from "react";
import MobileNavigationBarEntry from "../../components/MobileNavigationBarEntry";
import dashboardIcon from "../../assets/svg/navigation_icons/notification.svg";
import allClientsIcon from "../../assets/svg/navigation_icons/layers_alt.svg";
import homeIcon from "../../assets/svg/navigation_icons/home.svg";
import "./style.css";

const MobileNavigationBar = () => {
  const getNavigationItems = () => {
    return (
      <div className="mobile-navigation-bar">
        <MobileNavigationBarEntry
          label="Dashboard"
          destination="/dashboard"
          query="#"
          iconSource={dashboardIcon}
          iconAlt="Dashboard"
        />
        <MobileNavigationBarEntry
          label="Home"
          destination="/home"
          query="#"
          iconSource={homeIcon}
          iconAlt="Home"
        />
        <MobileNavigationBarEntry
          label="All Clients"
          destination="/view-client"
          query="clients"
          iconSource={allClientsIcon}
          iconAlt="All Clients"
        />
      </div>
    );
  };
  return (
    <div className="mobile-navigation-bar">
      {getNavigationItems()}
    </div>
  )
};

export default MobileNavigationBar;
