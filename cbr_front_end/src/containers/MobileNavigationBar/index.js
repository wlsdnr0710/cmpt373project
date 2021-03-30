import React from "react";
import NavigationBarEntry from "../../components/NavigationBarEntry";
import dashboardIcon from "../../assets/svg/navigation_icons/id_card.svg";
import allClientsIcon from "../../assets/svg/navigation_icons/people.svg";
import homeIcon from "../../assets/svg/navigation_icons/home.svg";
import syncIcon from "../../assets/svg/navigation_icons/cloud.svg";
import "./style.css";

const MobileNavigationBar = () => {
  const getNavigationItems = () => {
    return (
      <div className="mobile-navigation-bar">
        <NavigationBarEntry
          label="Dashboard"
          destination="/dashboard"
          query="#"
          iconSource={dashboardIcon}
          iconAlt="Dashboard"
        />
        <NavigationBarEntry
          label="Home"
          destination="/home"
          query="#"
          iconSource={homeIcon}
          iconAlt="Home"
        />
        <NavigationBarEntry
          label="All Clients"
          destination="/view-client"
          query="clients"
          iconSource={allClientsIcon}
          iconAlt="All Clients"
        />
        <NavigationBarEntry
          label="Sync"
          destination="#"
          query="#"
          iconSource={syncIcon}
          iconAlt="Sync Application"
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
