import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import logo from "../../assets/HHALogo.svg";
import "./style.css";
import MobileNavigationBar from "../../containers/MobileNavigationBar";
import DesktopNavigationBar from "../DesktopNavigationBar";


//TODO: Find way to import all assets at once 
const PageTemplate = ({ children }) => {
  let history = useHistory();
  const getTopBar = () => {
    return (
      <div className="top-navigation">
        <img className="logo" src={logo} alt="Hope Health Action Logo" onClick={()=>{history.push("/home")}}/>
        <div className="style-bar"></div>
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
      <div className="page-template">
        <div className="top-container">{getTopBar()}</div>
        <div className="bottom-container">
          <MobileNavigationBar />
          <DesktopNavigationBar />
          <div className="page-content">{children}</div>
        </div>
      </div>
    );
  }
};

export default PageTemplate;
