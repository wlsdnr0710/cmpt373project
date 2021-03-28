import React, { useEffect, useState } from "react";
import axios from 'axios';
import ServerConfig from '../../config/ServerConfig';
import { getToken } from "../../utils/AuthenticationUtil";
import { getOutstandingReferralsFromServer } from "../../utils/Utilities";
import OutstandingReferral from "../../components/OutstandingReferral";
import "./style.css";

const OutstandingReferralsList = () => {
    const [outstandingReferrals, setOutstandingReferrals] = useState([]);

    const getOutstandingReferrals = () => {
        const requestHeader = {
            token: getToken()
        };
        getOutstandingReferralsFromServer(requestHeader)
        .then(response => {
            setOutstandingReferrals(response.data.data);
        });
    };

    useEffect(()=> {
        getOutstandingReferrals();
    }, []);

    const createOutstandingReferralsListComponents = () => {
        const outstandingReferralsComponents = [];
        if(outstandingReferrals === undefined || outstandingReferrals.length === 0) {
            return (<p>Currently there are no outstandingReferrals.</p>);
        }
        else {
            for (const index in outstandingReferrals) {
                outstandingReferralsComponents.push(<OutstandingReferral number={index} client={outstandingReferrals[index]} key={index}/>);
            }
            return outstandingReferralsComponents;
        }
    };

    return (
        <div className='outstanding-referrals-list'>
            <div className="outstanding-referrals-title">Outstanding Referrals</div>
            {createOutstandingReferralsListComponents()}
        </div>
    );
}

export default OutstandingReferralsList;