import React from "react";
import { getRole, removeToken } from "../../utils/AuthenticationUtil";
import NavigationBarEntry from "../../components/NavigationBarEntry";
import dashboardIcon from "../../assets/svg/navigation_icons/notification.svg";
import newClientIcon from "../../assets/svg/navigation_icons/user_plus.svg";
import newVisitIcon from "../../assets/svg/navigation_icons/user_pin.svg";
import newReferralIcon from "../../assets/svg/navigation_icons/id_card.svg";
import allClientsIcon from "../../assets/svg/navigation_icons/layers_alt.svg";
import cloudSyncIcon from "../../assets/svg/navigation_icons/cloud.svg";
import logoutIcon from "../../assets/svg/navigation_icons/logout.svg";
import "./style.css";

const DesktopNavigationBar = () => {

    const getAdminNavigationItem = () => {
        if(getRole() === "admin") {
            return (
                <NavigationBarEntry
                    label="Admin"
                    destination="/admin"
                    query="#"
                    iconSource={dashboardIcon}
                    iconAlt="Admin"
                />
            );
        } else {
            return null;
        }
    };

    const getNavigationItems = () => {
        return (
            <div className="desktop-navigation-bar">
                {getAdminNavigationItem()}
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
