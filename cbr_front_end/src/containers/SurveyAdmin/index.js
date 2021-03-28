import React, { useEffect, useState } from "react";
import axios from 'axios';
import ServerConfig from '../../config/ServerConfig';
import { getToken } from "../../utils/AuthenticationUtil";
import "./style.css";

const SurveyAdmin = () => {

    return (
        <div className="survey-admin">
            <h1>Survey Admin</h1>
        </div>
    );
};

export default SurveyAdmin;