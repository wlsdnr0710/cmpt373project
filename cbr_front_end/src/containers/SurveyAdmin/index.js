import axios from 'axios';
import ServerConfig from '../../config/ServerConfig';
import { getToken } from "../../utils/AuthenticationUtil";
import "./style.css";

const SurveyAdmin = () => {

    return (
        <div className="survey-admin">
            <div className="survey-admin-title">
                Survey Admin
            </div>
        </div>
    );
};

export default SurveyAdmin;
