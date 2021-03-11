import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { removeToken } from "../../utils/AuthenticationUtil";
import MobileNavigationBarEntry from "../../components/MobileNavigationBarEntry";
import dashboardIcon from "../../assets/svg/navigation_icons/notification.svg";
import newClientIcon from "../../assets/svg/navigation_icons/user_plus.svg";
import newVisitIcon from "../../assets/svg/navigation_icons/user_pin.svg";
import newReferralIcon from "../../assets/svg/navigation_icons/id_card.svg";
import allClientsIcon from "../../assets/svg/navigation_icons/layers_alt.svg";
import homeIcon from "../../assets/svg/navigation_icons/home.svg";
import "./style.css";

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
          label="Home Icon"
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
