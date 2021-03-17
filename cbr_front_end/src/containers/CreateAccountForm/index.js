import React, { useEffect, useState } from 'react';
import { getToken } from "../../utils/AuthenticationUtil";
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import ServerConfig from "../../config/ServerConfig";
import TextInputField from "../../components/TextInputField";
import DropdownList from "../../components/DropdownList";
import BackgroundCard from "../../components/BackgroundCard";
import Button from 'react-bootstrap/Button';
import './style.css';

const CreateAccountForm = () => {

    const roleList = {
        "Worker": "1",
        "Admin": "2",
        "Clinician": "3",
    };

    const [zoneList, setZoneList] = useState({});

    const getAllAlertMessages = () => {
        const requestHeader = {
            token: getToken()
        };
        axios.get(
            ServerConfig.api.url + "/api/v1/zone",
            {
                headers: requestHeader,
            }
        )
        .then(response => {
            console.log(response.data.data);
            setZoneList(response.data.data);
            console.log(zoneList);
        });
    };

    useEffect(() => {
        getAllAlertMessages();
    }, []);

    return (
        <div>
            <BackgroundCard>
                <h1>Create Account</h1>
                <hr />
                <strong>First Name:</strong>
                <TextInputField
                    name="firstName"
                    value=""
                    //onChange={formInputChangeHandler}
                    //isDisabled={isFormInputDisabled}
                />
                <strong>Last Name:</strong>
                <TextInputField
                    name="lastName"
                    value=""
                    //onChange={formInputChangeHandler}
                    //isDisabled={isFormInputDisabled}
                />
                <strong>Zone:</strong>
                <DropdownList
                    dropdownName="zone"
                    value=""
                    dropdownListItemsKeyValue={zoneList}
                    //onChange={formInputChangeHandler}
                    //isDisabled={isFormInputDisabled}
                />
                <strong>Role:</strong>
                <DropdownList
                    dropdownName="role"
                    value=""
                    dropdownListItemsKeyValue={roleList}
                    //onChange={formInputChangeHandler}
                    //isDisabled={isFormInputDisabled}
                />
                <strong>Username:</strong>
                <TextInputField
                    name="username"
                    value=""
                    //onChange={formInputChangeHandler}
                    //isDisabled={isFormInputDisabled}
                />
                <strong>Password:</strong>
                <TextInputField
                    name="password"
                    value=""
                    //onChange={formInputChangeHandler}
                    //isDisabled={isFormInputDisabled}
                />
            </BackgroundCard>
        </div>
    )

};

export default CreateAccountForm;
