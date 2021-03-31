import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import logo from "../../assets/HHALogo.svg";
import "./style.css";
import MobileNavigationBar from "../../containers/MobileNavigationBar";
import DesktopNavigationBar from "../DesktopNavigationBar";


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

    const [isCurrentPageNonTemplate, setIsCurrentPageNonTemplate] = useState(false);
    const [isCurrentPageNonNav, setIsCurrentPageNonNav] = useState(false);
    const location = useLocation();
    const hideTemplate = useCallback(() => {
        const currentPageNonTemplate = location.pathname.indexOf("user-login") !== -1 ||
                                  location.pathname.indexOf("create-account") !== -1 ||
                                  location.pathname.indexOf("OTP-verification") !== -1 ||
                                  location.pathname.indexOf("forgot-password") !== -1;
        setIsCurrentPageNonTemplate(currentPageNonTemplate);
    }, [location]);

    
    const hideNav = useCallback(() => {
        const currentPageNonNav = location.pathname.indexOf("home") !== -1;
        setIsCurrentPageNonNav(currentPageNonNav);
    }, [location]);

    useEffect(() => {
        hideTemplate();
    }, [hideTemplate]);

    useEffect(() => {
        hideNav();
    }, [hideNav]);

    if (isCurrentPageNonTemplate) {
        return (
            <div>
                {children}
            </div>
        );
    } else if (isCurrentPageNonNav) {
        return (
            <div className="page-template">
                <div className="top-container">{getTopBar()}</div>
                <div className="page-content">{children}</div>
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
