import React from "react";
import FormHeader from "../../components/FormHeader";
import NavigationBarEntry from "../../components/NavigationBarEntry";
import SyncNavigationBarEntry from "../../components/SyncNavigationBarEntry";
import { removeToken } from "../../utils/AuthenticationUtil";
import dashboardIcon from "../../assets/svg/navigation_icons/id_card.svg";
import newClientIcon from "../../assets/svg/navigation_icons/user_plus.svg";
import newVisitIcon from "../../assets/svg/navigation_icons/visitor.svg";
import newReferralIcon from "../../assets/svg/navigation_icons/user_pin.svg";
import allClientsIcon from "../../assets/svg/navigation_icons/people.svg";
import syncIcon from "../../assets/svg/navigation_icons/cloud-sync.svg";
import logoutIcon from "../../assets/svg/navigation_icons/logout.svg";
import "./style.css";

const HomeNavigation = () => {
    const getNavigationItems = () => {
        return (
            <div className="home-navigation">
                <FormHeader headerText="Home"/>
                <div className="home-navigation-icons">
                    <NavigationBarEntry
                        label="Dashboard"
                        destination="/dashboard"
                        query="#"
                        iconSource={dashboardIcon}
                        iconAlt="Dashboard"
                    />
                    <SyncNavigationBarEntry
                        label="Sync"
                        iconSource={syncIcon}
                        iconAlt="Sync"
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
                    <div className="sign-out" onClick={() => {removeToken()}}>
                        <NavigationBarEntry
                            label="Sign out"
                            destination="user-login"
                            iconSource={logoutIcon}
                            iconAlt="Sign out"
                        />
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div>
            {getNavigationItems()}
        </div>
    )
};

export default HomeNavigation;
