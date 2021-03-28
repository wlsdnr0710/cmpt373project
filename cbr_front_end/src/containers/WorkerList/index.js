import React, { useEffect, useState } from "react";
import axios from 'axios';
import ServerConfig from '../../config/ServerConfig';
import { getToken } from "../../utils/AuthenticationUtil";
import "./style.css";

const WorkerList = () => {

    return (
        <div className="worker-list">
            <h1>Worker List</h1>
        </div>
    );
};

export default WorkerList;