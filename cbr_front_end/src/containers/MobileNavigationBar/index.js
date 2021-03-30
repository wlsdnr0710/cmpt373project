import React from "react";
import NavigationBarEntry from "../../components/NavigationBarEntry";
import dashboardIcon from "../../assets/svg/navigation_icons/id_card.svg";
import allClientsIcon from "../../assets/svg/navigation_icons/people.svg";
import homeIcon from "../../assets/svg/navigation_icons/home.svg";
import newReferralIcon from "../../assets/svg/navigation_icons/user_pin.svg";
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
          label="New Referral"
          destination="/new-referral"
          query="#"
          iconSource={newReferralIcon}
          iconAlt="New Referral"
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
