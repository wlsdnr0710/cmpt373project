import React from "react";
import {
    getToken,
    getRole,
    saveRole,
    removeToken,
    removeRole,
    getWorkerIdFromToken,
    isAuthenticated,
} from "../../utils/AuthenticationUtil";
import { useEffect, useState } from "react";
import { getWorkerInformationFromServer } from "../../utils/Utilities";
import SyncNavigationBarEntry from "../../components/SyncNavigationBarEntry";
import NavigationBarEntry from "../../components/NavigationBarEntry";
import dashboardIcon from "../../assets/svg/navigation_icons/id_card.svg";
import newClientIcon from "../../assets/svg/navigation_icons/user_plus.svg";
import newVisitIcon from "../../assets/svg/navigation_icons/visitor.svg";
import newReferralIcon from "../../assets/svg/navigation_icons/user_pin.svg";
import allClientsIcon from "../../assets/svg/navigation_icons/people.svg";
import syncIcon from "../../assets/svg/navigation_icons/sync.svg";
import logoutIcon from "../../assets/svg/navigation_icons/logout.svg";
import adminIcon from "../../assets/svg/navigation_icons/settings.svg";
import "./style.css";

const ROLE_ADMIN = "ADMIN";

const DesktopNavigationBar = () => {

    const [isAdminRole, setAdminRole] = useState(false);

    const setRoleIfRoleIsNull = () => {
        if (getRole() === null && isAuthenticated()) {
            const requestHeader = {
                token: getToken(),
            };
            getWorkerInformationFromServer(
                getWorkerIdFromToken(getToken()),
                requestHeader
            )
                .then((response) => {
                    const role = response.data.data.role;
                    saveRole(role);
                    if (role === ROLE_ADMIN) {
                        setAdminRole(true);
                    }
                })
                .catch((error) => {});
        }
    };

    const getAdminNavigationItem = () => {
        if (getRole() === ROLE_ADMIN || isAdminRole === true) {
            return (
                <NavigationBarEntry
                    label="Admin"
                    destination="/admin"
                    query="#"
                    iconSource={adminIcon}
                    iconAlt="Admin"
                />
            );
        } else {
            return null;
        }
    };

    const onSignOut = () => {
        removeToken();
        removeRole();
        setAdminRole(false);
    };

    useEffect(() => {
        setRoleIfRoleIsNull();
    }, []);

    const getDefaultNavigationItems = () => {
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
                    destination="/view-client"
                    query="referrals"
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
                <div onClick={onSignOut}>
                    <NavigationBarEntry
                        label="Sign out"
                        destination="user-login"
                        iconSource={logoutIcon}
                        iconAlt="Sign out"
                    />
                </div>
                <div className="sync">
                    <SyncNavigationBarEntry
                        label="Sync"
                        iconSource={syncIcon}
                        iconAlt="Sync"
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="desktop-navigation-bar">
            {getDefaultNavigationItems()}
        </div>
    );
};

export default DesktopNavigationBar;
