import axios from 'axios';
import ServerConfig from '../../config/ServerConfig';
import { getToken } from "../../utils/AuthenticationUtil";
import "./style.css";

const WorkerList = () => {

    return (
        <div className="worker-list">
            <div className="worker-list-title">
                Worker List
            </div>
        </div>
    );
};

export default WorkerList;
