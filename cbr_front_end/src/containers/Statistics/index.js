import React, { useEffect, useState } from "react";
import axios from 'axios';
import ServerConfig from '../../config/ServerConfig';
import { getToken } from "../../utils/AuthenticationUtil";
import "./style.css";

const Statistics = () => {

    return (
        <div className="statistics">
            <h1>Statistics</h1>
        </div>
    );
};

export default Statistics;