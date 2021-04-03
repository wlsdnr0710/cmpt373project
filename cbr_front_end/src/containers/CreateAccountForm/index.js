import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import TextInputField from "../../components/TextInputField";
import DropdownList from "../../components/DropdownList";
import BackgroundCard from "../../components/BackgroundCard";
import Button from 'react-bootstrap/Button';
import { addWorkerToServer, getZonesFromServer} from "../../utils/Utilities";
import './style.css';

const CreateAccountForm = () => {
    const history = useHistory();
    const [errorMessages, setErrorMessages] = useState([]);
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

    const getRoleMapping = () => {
        return {
            "Worker": "Worker",
            "Admin": "Admin",
            "Clinician": "Clinician",
        };
    };

    const [formInputs, setFormInputs] = useState({
        "firstName": "",
        "lastName": "",
        "zone": 1,
        "role": "Worker",
        "email": "",
        "phone": "",
        "username": "",
        "password": ""
    });

    const [zoneList, setZoneList] = useState({});

    const getZones = () => {
        getZonesFromServer()
        .then(response => {
            setZoneList(response.data.data);
        });
    };

    const addNewWorker = () => {
        clearErrorMessages();
        getZoneId();
        addWorkerToServer(formInputs)
        .then(response => {
            onSubmitSuccess();
        })
        .catch(error => {
            updateErrorMessages(error);
        })
    };

    const onSubmitSuccess = () => {
        setIsSubmitSuccess(true);
        setTimeout(() => {
            history.push("user-login");
        }, 2000);
    };

    const showErrorMessages = () => {
        if (hasErrorMessages()) {
            const msgInDivs = packMessagesInDivs(errorMessages);
            return (
                <Alert variant="danger">
                    {msgInDivs}
                </Alert>
            );
        } else {
            return null;
        }
    };

    const showSuccessMessage = () => {
        if (isSubmitSuccess) {
            return (
                <div className="success">
                    <Alert variant="success">
                        Account created successfully! Redirecting to the login page.
                    </Alert>
                </div>
            );
        } else {
            return null;
        }
    };

    const clearErrorMessages = () => {
        setErrorMessages([]);
    };

    const hasErrorMessages = () => {
        return errorMessages.length !== 0;
    };

    const packMessagesInDivs = messages => {
        const msgInDivs = [];
        for (const idx in messages) {
            const msg = messages[idx];
            msgInDivs.push(
                <div key={idx}>
                    {msg}
                </div>
            );
        }
        return msgInDivs;
    };

    const updateErrorMessages = error => {
        setErrorMessages(prevErrorMessages => {
            let messages = ["Something went wrong on the server."];
            if (error.response) {
                messages = error.response.data.messages;
            }
            const newMessages = [...prevErrorMessages, ...messages];
            return newMessages;
        });
    };

    const updateFormInputByNameValue = (name, value) => {
        setFormInputs(prevFormInputs => {
            const newFormInputs = { ...prevFormInputs };
            newFormInputs[name] = value;
            return newFormInputs;
        });
    };

    const getZoneId = () => {
        for (const index in zoneList) {
            if (zoneList[index].name === formInputs["zone"]) {
                updateFormInputByNameValue("zone", zoneList[index].id);
            }
        }
    };

    const formInputChangeHandler = event => {
        const input = event.target;
        const name = input.name;
        const value = input.value;
        updateFormInputByNameValue(name, value);
    };

    useEffect(() => {
        getZones();
    }, []);

    return (
        <div className="create-account-form">
            <BackgroundCard>
                <h1>Create Account</h1>
                <hr />
                <strong>First Name:</strong>
                <div className="form-input">
                    <TextInputField
                        name="firstName"
                        value={formInputs["firstName"]}
                        onChange={formInputChangeHandler}
                    />
                </div>
                <strong>Last Name:</strong>
                <div className="form-input">
                    <TextInputField
                        name="lastName"
                        value={formInputs["lastName"]}
                        onChange={formInputChangeHandler}
                    />
                </div>
                <strong>Zone:</strong>
                <div className="form-input">
                    <DropdownList
                        dropdownName="zone"
                        value={formInputs["zone"]}
                        dropdownListItemsKeyValue={zoneList}
                        onChange={formInputChangeHandler}
                    />
                </div>
                <strong>Role:</strong>
                <div className="form-input">
                    <DropdownList
                        dropdownName="role"
                        value={formInputs["role"]}
                        dropdownListItemsKeyValue={getRoleMapping()}
                        onChange={formInputChangeHandler}
                    />
                </div>
                <strong>Username:</strong>
                <div className="form-input">
                    <TextInputField
                        name="username"
                        value={formInputs["username"]}
                        onChange={formInputChangeHandler}
                    />
                </div>
                <strong>Password:</strong>
                <div className="form-input">
                    <input
                        type="password"
                        name="password"
                        value={formInputs["password"]}
                        onChange={formInputChangeHandler}
                    />
                </div>
                <strong>Email:</strong>
                <div className="form-input">
                    <TextInputField
                        name="email"
                        value={formInputs["email"]}
                        onChange={formInputChangeHandler}
                    />
                </div>
                <strong>Phone Number:</strong>
                <div className="form-input">
                    <TextInputField
                        name="phone"
                        value={formInputs["phone"]}
                        onChange={formInputChangeHandler}
                    />
                </div>
                <div className="form-input">
                    <Button
                        onClick={addNewWorker}
                        variant="primary">
                        Submit
                    </Button>
                </div>
                {showErrorMessages()}
                {showSuccessMessage()}
            </BackgroundCard>
        </div>
    )
};

export default CreateAccountForm;
