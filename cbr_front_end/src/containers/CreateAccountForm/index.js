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

    const [formInputs, setFormInputs] = useState({
        "firstName": "",
        "lastName": "",
        "zone": 0,
        "role": "",
        "email": "",
        "phoneNumber": "",
        "username": "",
        "password": ""
    });

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
            setZoneList(response.data.data);
        });
    };

    useEffect(() => {
        getAllAlertMessages();
    }, []);

    const updateFormInputByNameValue = (name, value) => {
        setFormInputs(prevFormInputs => {
            const newFormInputs = { ...prevFormInputs };
            newFormInputs[name] = value;
            return newFormInputs;
        });
    };

    const formInputChangeHandler = event => {
        const input = event.target;
        const name = input.name;
        const value = input.value;
        updateFormInputByNameValue(name, value);
    };

    return (
        <div className="create-account-form">
            <BackgroundCard>
                <h1>Create Account</h1>
                <hr />
                <div className="form-input">
                <strong>First Name:</strong>
                <TextInputField
                    name="firstName"
                    value={formInputs["firstName"]}
                    onChange={formInputChangeHandler}
                    isDisabled={false}
                />
                </div>
                <div className="form-input">
                <strong>Last Name:</strong>
                <TextInputField
                    name="lastName"
                    value={formInputs["lastName"]}
                    onChange={formInputChangeHandler}
                    isDisabled={false}
                />
                </div>
                <div className="form-input">
                <strong>Zone:</strong>
                <DropdownList
                    dropdownName="zone"
                    value={formInputs["zone"]}
                    dropdownListItemsKeyValue={zoneList}
                    onChange={formInputChangeHandler}
                    isDisabled={false}
                />
                </div>
                <div className="form-input">
                <strong>Role:</strong>
                <DropdownList
                    dropdownName="role"
                    value={formInputs["role"]}
                    dropdownListItemsKeyValue={roleList}
                    onChange={formInputChangeHandler}
                    isDisabled={false}
                />
                </div>
                <div className="form-input">
                <strong>Username:</strong>
                <TextInputField
                    name="username"
                    value={formInputs["username"]}
                    onChange={formInputChangeHandler}
                    isDisabled={false}
                />
                </div>
                <div className="form-input">
                <strong>Password:</strong>
                <TextInputField
                    name="password"
                    value={formInputs["password"]}
                    onChange={formInputChangeHandler}
                    isDisabled={false}
                />
                </div>
                <div className="form-input">
                <strong>Email:</strong>
                <TextInputField
                    name="email"
                    value={formInputs["email"]}
                    onChange={formInputChangeHandler}
                    isDisabled={false}
                />
                </div>
                <div className="form-input">
                <strong>Phone Number:</strong>
                <TextInputField
                    name="phoneNumber"
                    value={formInputs["phoneNumber"]}
                    onChange={formInputChangeHandler}
                    isDisabled={false}
                />
                </div>
                <div className="form-input">
                <Button
                    variant="primary">
                    Create
                </Button>
                </div>
            </BackgroundCard>
        </div>
    )
};

export default CreateAccountForm;
