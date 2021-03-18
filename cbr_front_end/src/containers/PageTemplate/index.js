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

    const [isCurrentPageLoginOrCreateAccount, setIsCurrentPageLoginOrCreateAccount] = useState(false);
    const location = useLocation();
    const hideNavInLoginPage = useCallback(() => {
        const currentPageIsLoginOrCreateAccount = location.pathname.indexOf("login") !== -1 || location.pathname.indexOf("create-account") !== -1;
        setIsCurrentPageLoginOrCreateAccount(currentPageIsLoginOrCreateAccount);
    }, [location]);

    useEffect(() => {
        hideNavInLoginPage();
    }, [hideNavInLoginPage]);

    if (isCurrentPageLoginOrCreateAccount) {
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
