import React from "react";
import NavigationBarEntry from "../NavigationBarEntry";
import dashboardIcon from "../../assets/svg/navigation_icons/notification.svg";
import newClientIcon from "../../assets/svg/navigation_icons/user_plus.svg";
import newVisitIcon from "../../assets/svg/navigation_icons/user_pin.svg";
import newReferralIcon from "../../assets/svg/navigation_icons/id_card.svg";
import allClientsIcon from "../../assets/svg/navigation_icons/layers_alt.svg";
import cloudSyncIcon from "../../assets/svg/navigation_icons/cloud.svg";
import hamburgerMenuIcon from "../../assets/svg/navigation_icons/hamburger.svg";
import logo from "../../assets/HHALogo.svg";
import "./style.css";

//TODO: Fix importing all images

const PageTemplate = ({ children }) => {
  const getSideBar = () => {
    return (
      <div className="side-navigation">
        <NavigationBarEntry
          label="Dashboard"
          destination="#"
          iconSource={dashboardIcon}
          iconAlt="Dashboard"
        />
        <NavigationBarEntry
          label="New Client"
          destination="#"
          iconSource={newClientIcon}
          iconAlt="New Client"
        />
        <NavigationBarEntry
          label="New Visit"
          destination="#"
          iconSource={newVisitIcon}
          iconAlt="New Visit"
        />
        <NavigationBarEntry
          label="New Referral"
          destination="#"
          iconSource={newReferralIcon}
          iconAlt="New Referral"
        />
        <NavigationBarEntry
          label="All Clients"
          destination="#"
          iconSource={allClientsIcon}
          iconAlt="All Clients"
        />
        <div className="sync">
          <NavigationBarEntry
            label="Sync"
            destination="#"
            iconSource={cloudSyncIcon}
            iconAlt="Sync"
          />
        </div>
      </div>
    );
  };

  const getTopBar = () => {
    return (
      <div className="top-navigation">
          <img className="hamburger-menu"src={hamburgerMenuIcon} alt="Navigation Menu"/>
          <img className="logo" src={logo} alt="Hope Health Action Logo"/>
        <div className="style-bar"></div>
      </div>
    );
  };

  return (
    <div className="page-template">
      <div className="top-container">{getTopBar()}</div>
      <div className="bottom-container">
        <div className="side-navigation">{getSideBar()}</div>
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default PageTemplate;
