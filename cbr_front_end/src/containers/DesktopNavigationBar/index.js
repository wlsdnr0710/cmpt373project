import React from "react";
import { removeToken } from "../../utils/AuthenticationUtil";
import NavigationBarEntry from "../../components/NavigationBarEntry";
import dashboardIcon from "../../assets/svg/navigation_icons/id_card.svg";
import newClientIcon from "../../assets/svg/navigation_icons/user_plus.svg";
import newVisitIcon from "../../assets/svg/navigation_icons/visitor.svg";
import newReferralIcon from "../../assets/svg/navigation_icons/user_pin.svg";
import allClientsIcon from "../../assets/svg/navigation_icons/people.svg";
import cloudSyncIcon from "../../assets/svg/navigation_icons/sync.svg";
import logoutIcon from "../../assets/svg/navigation_icons/logout.svg";
import "./style.css";

const DesktopNavigationBar = () => {
  const getNavigationItems = () => {
    return (
      <div className="desktop-navigation-bar">
        <NavigationBarEntry
          label="Dashboard"
          destination="/dashboard"
          query="#"
          iconSource={dashboardIcon}
          iconAlt="Dashboard"
        />
        <NavigationBarEntry
          label="New Client"
          destination="/new-client"
          query="#"
          iconSource={newClientIcon}
          iconAlt="New Client"
        />
        <NavigationBarEntry
          label="New Visit"
          destination="/view-client"
          query="visits"
          iconSource={newVisitIcon}
          iconAlt="New Visit"
        />
        <NavigationBarEntry
          label="New Referral"
          destination="/new-referral"
          query="#"
          iconSource={newReferralIcon}
          iconAlt="New Referral"
        />
        <NavigationBarEntry
          label="All Clients"
          destination="/view-client"
          query="clients"
          iconSource={allClientsIcon}
          iconAlt="All Clients"
        />
        <div onClick={() => {removeToken()}}>
          <NavigationBarEntry
            label="Sign out"
            destination="user-login"
            iconSource={logoutIcon}
            iconAlt="Sign out"
          />
        </div>
        <div className="sync">
          <NavigationBarEntry
            label="Sync"
            destination="#"
            query="#"
            iconSource={cloudSyncIcon}
            iconAlt="Sync"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="desktop-navigation-bar">
      {getNavigationItems()}
    </div>
  );
};

export default DesktopNavigationBar;
