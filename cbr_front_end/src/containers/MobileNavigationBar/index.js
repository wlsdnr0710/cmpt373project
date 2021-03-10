import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { removeToken } from "../../utils/AuthenticationUtil";
import MobileNavigationBarEntry from "../../components/MobileNavigationBarEntry";
import dashboardIcon from "../../assets/svg/navigation_icons/notification.svg";
import newClientIcon from "../../assets/svg/navigation_icons/user_plus.svg";
import newVisitIcon from "../../assets/svg/navigation_icons/user_pin.svg";
import newReferralIcon from "../../assets/svg/navigation_icons/id_card.svg";
import allClientsIcon from "../../assets/svg/navigation_icons/layers_alt.svg";
import cloudSyncIcon from "../../assets/svg/navigation_icons/cloud.svg";
import logoutIcon from "../../assets/svg/navigation_icons/logout.svg";
import hamburgerMenuIcon from "../../assets/svg/navigation_icons/hamburger.svg";
import logo from "../../assets/HHALogo.svg";
import "./style.css";

//TODO: Find way to import all assets at once 
const PageTemplate = ({ children }) => {


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
          label="New Client"
          destination="/new-client"
          query="#"
          iconSource={newClientIcon}
          iconAlt="New Client"
        />
        <MobileNavigationBarEntry
          label="New Visit"
          destination="/view-client"
          query="visits"
          iconSource={newVisitIcon}
          iconAlt="New Visit"
        />
        <MobileNavigationBarEntry
          label="New Referral"
          destination="#"
          query="#"
          iconSource={newReferralIcon}
          iconAlt="New Referral"
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

  const getSideBarMobileOnState = (showSideBarMobile) => {
    if (showSideBarMobile) {
      return (
        <div className="side-navigation-mobile">{getNavigationItems()}</div>
      );
    } else {
      return;
    }
  };

  const getSideBarDesktop = () => {
    return (
      <div className="side-navigation-desktop">{getNavigationItems()}</div>
    );
  };

  const [isCurrentPageLogin, setIsCurrentPageLogin] = useState(false);
  const location = useLocation();
  const hideNavInLoginPage = useCallback(() => {
    const currentPageIsLogin = location.pathname.indexOf("login") !== -1;
    setIsCurrentPageLogin(currentPageIsLogin);
  }, [location]);

  useEffect(() => {
    hideNavInLoginPage();
  }, [hideNavInLoginPage]);

  if (isCurrentPageLogin) {
    return (
      <div>
        {children}
      </div>
    );
  } else {
    return (
      <div className="">
          {getNavigationItems()}
          <div className="page-content">{children}</div>
      </div>
    );
  }
};

export default PageTemplate;
