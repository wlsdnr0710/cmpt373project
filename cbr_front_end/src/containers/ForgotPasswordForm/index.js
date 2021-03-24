import React, {useEffect, useState} from 'react';
import LoginInputField from "../../components/LoginInputField";
import { getToken, removeToken, getWorkerUsernameFromToken} from "../../utils/AuthenticationUtil";
import {useHistory} from "react-router-dom"
import BackgroundCard from "../../components/BackgroundCard";
import axios from 'axios';
import ServerConfig from '../../config/ServerConfig';
import "./style.css";

const ForgotPasswordForm = () => {
    const history = useHistory();
    const [workerInformation, setWorkerInformation] = useState({
        "data" : {
            "id": null,
            "firstName": "",
            "lastName": "",
            "username": "",
            "password": "",
            "phone": "",
            "email": "",
            "role": "",
            "zone": null,
            "zoneName": {
                "id": null,
                "name": ""
            }
        }
    });

    const [passwordForm, setPasswordForm] = useState ({
        "newPassword" : "",
        "confirmNewPassword" : "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [hideErrorMessage, setHideErrorMessage] = useState(true);
    
    const setWorkerInformationForm = data => {
        setWorkerInformation(data);
    }

    const getWorkerByGetRequest = () => {
        const requestHeader = {
            token: getToken()
        };
        axios.get(ServerConfig.api.url +  '/api/v1/worker/username/' + getWorkerUsernameFromToken(getToken()), {
            headers: requestHeader,
        })
        .then(response => {
            console.log(response);
            setWorkerInformationForm (response.data);
        })
        .catch(error => {
            setErrorMessage("Unable to retrieve data from server!");
            setHideErrorMessage(false);
        });
    }
    
    const passwordFormChangeHandler = event => {
        const input = event.target;
        const name = input.name;
        const value = input.value;
        updatePasswordChangeForm(name, value);
    }

    const updatePasswordChangeForm = (name, value) => {
        setPasswordForm(prevFormInputs => {
            const newFormInputs = { ...prevFormInputs };
            newFormInputs[name] = value;
            return newFormInputs;
        });
    }

    const isPasswordConfirmed = () => {
        return (passwordForm["newPassword"] === passwordForm["confirmNewPassword"]);
    }   
    
    const handleSubmit = () => {
        if (isPasswordConfirmed()) {
            setHideErrorMessage(true);
            workerInformation["data"]["password"] = passwordForm["newPassword"];
            updateWorkerByNewVisitByPostRequest(workerInformation);
        }
        else {
            setErrorMessage("New Password and Confirm Password does not match")
            setHideErrorMessage(false);
        }
    }

    const updateWorkerByNewVisitByPostRequest = data => {
        const requestHeader = {
            token: getToken()
        };
        axios.put(ServerConfig.api.url +  '/api/v1/worker', {
            data : data["data"]
        }, {
            headers: requestHeader,
        })
        .then(response => {
            removeToken();
            history.push("/login");
        })
        .catch(error => {
            setErrorMessage("Unable to change password in server");
            setHideErrorMessage(false);
        });
    }

    useEffect(() => {
        getWorkerByGetRequest();
    }, []);

    return (
        <div className="create-password-form">
            <BackgroundCard>
                <div>
                    <h1>Change Password</h1>
                    <hr />
                    <div>
                        <strong>Cbr Worker Name : </strong> 
                        {workerInformation.data.firstName} {workerInformation.data.lastName}
                    </div>
                    <div>
                        <strong>Username: </strong> 
                        {workerInformation.data.username}
                    </div>
                    <div>
                        <strong>Phone Number: </strong> 
                        {workerInformation.data.phone}
                    </div>
                    <div>
                        <div className={"horizontal-flex"}>
                            <div>
                                <strong>New Password:</strong>
                            </div>
                            <div className={"margin-left-32px"}>
                                <LoginInputField
                                    name={"newPassword"}
                                    value={passwordForm["newPassword"]}
                                    onChangeValue={passwordFormChangeHandler}
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                        <div className={"horizontal-flex"}>
                            <div>
                                <strong>Confirm Password:</strong>
                            </div>
                            <div className={"margin-left-5px"}>
                                <LoginInputField
                                    name={"confirmNewPassword"}
                                    value={passwordForm["confirmNewPassword"]}
                                    onChangeValue={passwordFormChangeHandler}
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={"error-message"} hidden={hideErrorMessage}>
                        {errorMessage}
                    </div>
                    <button className="cred-button" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </BackgroundCard>
        </div>
        
    );

}


export default ForgotPasswordForm;