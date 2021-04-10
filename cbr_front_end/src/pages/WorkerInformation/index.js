import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getToken, doAuthentication, checkForAdmin } from "../../utils/AuthenticationUtil";
import avatar from "../../assets/avatar.png";
import WorkerInformationBox from "../../components/WorkerInformationBox";
import BackgroundCard from "../../components/BackgroundCard";
import axios from 'axios';
import qs from "query-string";
import ServerConfig from '../../config/ServerConfig';
import { getWorkerObject } from "../../utils/Utilities";
import "./style.css"

const WorkerInformation = props => {
    const history = useHistory();
    doAuthentication(history);
    checkForAdmin(history);

    const parameterString = props.location.search;
    const workerId = qs.parse(parameterString).id;

    const getWorkerDataByGetRequest = useCallback(() => {
        const requestHeader = {
            token: getToken()
        };
        getWorkerInformationFromServerById(workerId, requestHeader)
        .then(response => {
            var JSONData = response.data;
            setFormInputs(prevFormInputs => {
                const data = JSONData.data;
                const newFormInputs = {...prevFormInputs};
                
                // TODO: remove or add a photo field for the worker in the backend
                newFormInputs["photo"] = {avatar};

                newFormInputs["name"] = data.firstName + " " + data.lastName;
                newFormInputs["id"] = data.id;
                newFormInputs["zone"] = data.zoneName.name;
                newFormInputs["email"] = data.email;
                newFormInputs["role"] = data.role;
                newFormInputs["contactNumber"] = data.phone;

                return newFormInputs;
            });
        })
        .catch(error => {
            console.log("Get request failed, error: " + error)
        });
    }, [workerId]);

    const [formInputs, setFormInputs] = useState(
        getWorkerObject()
    );

    const onClickGetEditWorkerPage = () => {
        history.push({
            pathname: "/edit-worker",
            state: { workerID: formInputs["id"]}
        })
    }

    useEffect(() => {
        getWorkerDataByGetRequest();
    }, [getWorkerDataByGetRequest]);

    return (
        <div>
            <div>
                <BackgroundCard>
                    <main className>
                        <WorkerInformationBox
                            className="worker-general-information"
                            workerObject={formInputs}
                        />
                        <hr className="worker-information-hr" />
                        <div className="worker-information-hr">
                            <div className="worker-information-hr mt-3">
                                <button type="button" className="btn btn-secondary" onClick={onClickGetEditWorkerPage}>
                                    Edit
                                </button>
                            </div>
                        </div>
                    </main>
                </BackgroundCard>
            </div>
        </div>
    );
};

export default WorkerInformation;
