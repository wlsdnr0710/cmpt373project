import React, { useState } from "react";
import NavigationBarEntry from "../../components/NavigationBarEntry";
import dashboardIcon from "../../assets/svg/navigation_icons/notification.svg";
import newClientIcon from "../../assets/svg/navigation_icons/user_plus.svg";
import newVisitIcon from "../../assets/svg/navigation_icons/user_pin.svg";
import newReferralIcon from "../../assets/svg/navigation_icons/id_card.svg";
import allClientsIcon from "../../assets/svg/navigation_icons/layers_alt.svg";
import cloudSyncIcon from "../../assets/svg/navigation_icons/cloud.svg";
import hamburgerMenuIcon from "../../assets/svg/navigation_icons/hamburger.svg";
import logo from "../../assets/HHALogo.svg";
import "./style.css";

//TODO: Find way to import all assets at once 

const PageTemplate = ({children}) => {
  const getTopBar = () => {
    return (
      <div className="top-navigation">
        <div onClick={toggleSideBarMobile}>
          <img
            className="hamburger-menu"
            src={hamburgerMenuIcon}
            alt="Navigation Menu"
          />
        </div>
        <img className="logo" src={logo} alt="Hope Health Action Logo" />
        <div className="style-bar"></div>
      </div>
    );
  };

  const [showSideBarMobile, setSideBarMobile] = useState(false);

  const toggleSideBarMobile = () => {
    setSideBarMobile(!showSideBarMobile);
  };

  const getNavigationItems = () => {
    return (
      <div>
        <NavigationBarEntry
          label="Dashboard"
          destination="/dashboard"
          iconSource={dashboardIcon}
          iconAlt="Dashboard"
        />
        <NavigationBarEntry
          label="New Client"
          destination="/new-client"
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
          destination="/view-client"
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

  const getSideBarMobileOnState = (showSideBarMobile) => {
    if (showSideBarMobile) {
      return <div className="side-navigation-mobile">{getNavigationItems()}</div>;
    } else {
      return;
    }
  };

  const getSideBarDesktop = () => {
    return <div className="side-navigation-desktop">{getNavigationItems()}</div>;
  };

  return (
    <div className="page-template">
      <div className="top-container">{getTopBar()}</div>
      <div className="bottom-container">
        {getSideBarMobileOnState(showSideBarMobile)}
        <div className="side-navigation">{getSideBarDesktop()}</div>
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default PageTemplate;