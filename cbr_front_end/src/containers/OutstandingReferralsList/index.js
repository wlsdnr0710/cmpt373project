import React, { useEffect, useState } from "react";
import axios from 'axios';
import ServerConfig from '../../config/ServerConfig';
import { getToken, getWorkerUsernameFromToken} from "../../utils/AuthenticationUtil";
import "./style.css";

const OutstandingReferralsList = () => {

    return (
        <div className='outstanding-referrals-list'>
            <div className="outstanding-referrals-title">Outstanding Referrals</div>
        </div>
    );
}

export default OutstandingReferralsList;