import React, { useEffect, useState } from "react";
import axios from 'axios';
import ServerConfig from '../../config/ServerConfig';
import { getToken, getWorkerUsernameFromToken} from "../../utils/AuthenticationUtil";
import OutstandingReferral from "../../components/OutstandingReferral";
import "./style.css";

const OutstandingReferralsList = () => {
    const [outstandingReferrals, setOutstandingReferrals] = useState([]);

    const getOutstandingReferrals = () => {
        const requestHeader = {
            token: getToken()
        };
        axios.get(
            ServerConfig.api.url + "/api/v1/client/outstandingReferrals",
            {
                headers: requestHeader,
            }
        )
        .then(response => {
            console.log(response.data.data[1].referrals.length);
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