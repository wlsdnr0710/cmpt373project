import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import TextInputField from "../../components/TextInputField";
import DropdownList from "../../components/DropdownList";
import DateInputField from "../../components/DateInputField";
import avatar from "../../assets/avatar.png";
import NumberInputField from "../../components/NumberInputField";
import PhoneInputField from "../../components/PhoneInputField";
import ImageInputField from "../../components/ImageInputField";
import RiskInformation from "../RiskInformation";
import { getToken } from "../../utils/AuthenticationUtil";
import {
    deleteClientFromServer,
    getClientInformationFromServer,
    getClientObject,
    updateClientInformationToServer,
    getClientZonesObject,
    getGendersObject,
    getZonesFromServer,
    addRiskToServer,
    parseEpochToDateString
} from "../../utils/Utilities";
import DisabilityInformation from "../../components/DisabilityInformation";
import "./style.css";

const genders = getGendersObject();

const EditClientForm = (props) => {
    const clientId = props.clientID;
    const history = useHistory();

    const [clientInformation, setClientInformation] = useState(
        getClientObject()
    );
    const [originalClientInformation, setOriginalClientInformation] = useState(
        getClientObject()
    );

    const [zoneList, setZoneList] = useState({});

    const discardChanges = () => {
        setClientInformation(originalClientInformation);
    };

    const getZones = () => {
        getZonesFromServer()
        .then(response => {
            setZoneList(response.data.data);
        });
    };

    const getClientInformation = useCallback(() => {
        const requestHeader = {
            token: getToken(),
        };
        getClientInformationFromServer(clientId, requestHeader)
        .then((response) => {
            setClientInformation(response.data.data);
            setOriginalClientInformation(response.data.data);
        })
        .catch((error) => {
            console.log("ERROR: Get request failed. " + error);
        });
    }, [clientId]);

    const initEpochDateTime = () => {
        let newDate = new Date();
        const epochDate = Math.floor(newDate.getTime());
        const date = parseEpochToDateString(epochDate);

        updateFormInputByNameValue("date", date);
    }


    useEffect(() => {
        getClientInformation();
        getZones();
    }, [getClientInformation]);

    const handleChange = (event) => {
        const input = event.target;
        const name = input.name;
        const value = input.value;
        updateClientInformation(name, value);
    };

    const saveChangesAndPushClientInformationPage = (event) => {
        event.preventDefault();
        const requestHeader = {
            token: getToken(),
        };

        updateClientInformationToServer(clientInformation, requestHeader)
            .then((response) => {
                setFormStateAfterSubmitSuccess();
                const clientId = response.data.id;
                const oneSecond = 1;
                redirectToClientInfoPageAfter(clientId, oneSecond);
            })
            .catch((error) => {
                updateErrorMessages(error);
                setStatesWhenFormIsSubmitting(false);
            });
    };

    const clearErrorMessages = () => {
        setErrorMessages([]);
    };

    const updateErrorMessages = (error) => {
        setErrorMessages((prevErrorMessages) => {
            let messages = ["Something went wrong on the server."];
            if (error.response) {
                messages = error.response.data.messages;
            }
            const newMessages = [...prevErrorMessages, ...messages];
            return newMessages;
        });
    };

    const updateClientInformation = (name, value) => {
        setClientInformation((prevFormInputs) => {
            const newFormInputs = { ...prevFormInputs };
            newFormInputs[name] = value;
            return newFormInputs;
        });
    };

    const deleteClientAndPushAllClientPage = () => {
        const requestHeader = {
            token: getToken(),
        };
        deleteClientFromServer(clientId, requestHeader)
            .then((response) => {
                setFormStateAfterDeleteSuccess();
                const clientId = response.data.id;
                const oneSecond = 1;
                redirectToViewClientsPageAfter(oneSecond);
            })
            .catch((error) => {
                updateErrorMessages(error);
                setStatesWhenFormIsSubmitting(false);
            });
    };

    const [showImageUploader, setImageUploader] = useState(false);

    const toggleImageUpload = () => {
        setImageUploader(!showImageUploader);
    };

    const getImageUploadOnState = (showImageUploader) => {
        if (showImageUploader) {
            return (
                <ImageInputField
                    id="client-photo-input"
                    primaryText="Select a photo for CLIENT"
                    secondaryText="PNG, jpg, gif files up to 10 MB in size"
                />
            );
        } else {
            return null;
        }
    };

    const formInputChangeHandler = event => {
        const input = event.target;
        const name = input.name;
        const value = input.value;
        updateFormInputByNameValue(name, value);
    };

    const updateFormInputByNameValue = (name, value) => {
        setFormInputs(prevFormInputs => {
            const newFormInputs = { ...prevFormInputs };
            newFormInputs[name] = value;
            return newFormInputs;
        });
    };

    const submitFormByPostRequest = data => {
        setStatesWhenFormIsSubmitting(true);
        console.log(data);
        const requestHeader = {
            token: getToken()
        };
        addRiskToServer(data, requestHeader)
        .then(response => {
            setFormStateAfterSubmitSuccess();
            const clientId = response.data.id;
            const oneSecond = 1;
                redirectToViewClientsPageAfter(oneSecond);
        })
        .catch(error => {

            updateErrorMessages(error);
            setStatesWhenFormIsSubmitting(false);
        })
    };

    const onSubmitRiskHandler = event => {
        let submittedForm = formInputs;
        event.preventDefault();
        clearErrorMessages();


        // We do not set state here because setState is asynchronous.
        // State may not be updated when we submit the form.
        const sendingData = { ...formInputs };


        submitFormByPostRequest(sendingData);
    };

    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
    const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const [formInputs, setFormInputs] = useState({
        "clientId": clientId,
        "createdDate": "2021-04-09",
        "healthGoal": "",
        "healthRisk": "",
        "healthRiskDescription": "",
        "educationGoal": "",
        "educationRisk": "",
        "educationRiskDescription": "",
        "socialGoal": "",
        "socialRisk": "",
        "socialRiskDescription": "",

    });

    const showSuccessMessage = () => {
        if (isSubmitSuccess) {
            return (
                <Alert variant="success">
                    You updated client information successfully! You will be
                    redirected to the client page soon.
                </Alert>
            );
        } else {
            return null;
        }
    };

    const showDeleteMessage = () => {
        if (isDeleteSuccess) {
            return (
                <Alert variant="success">
                    You deleted client successfully! You will be redirected to
                    the client list page soon.
                </Alert>
            );
        } else {
            return null;
        }
    };

    const showErrorMessages = () => {
        if (hasErrorMessages()) {
            const msgInDivs = packMessagesInDivs(errorMessages);
            return <Alert variant="danger">{msgInDivs}</Alert>;
        } else {
            return null;
        }
    };

    const setFormStateAfterSubmitSuccess = () => {
        setIsSubmitSuccess(true);
        setIsSubmitting(false);
        setIsDeleteSuccess(false);
    };

    const setFormStateAfterDeleteSuccess = () => {
        setIsSubmitSuccess(false);
        setIsSubmitting(false);
        setIsDeleteSuccess(true);
    };

    const setStatesWhenFormIsSubmitting = (isSubmitting) => {
        if (isSubmitting) {
            setIsSubmitting(true);
        } else {
            setIsSubmitting(false);
        }
    };

    const packMessagesInDivs = (messages) => {
        const msgInDivs = [];
        for (const idx in messages) {
            const msg = messages[idx];
            msgInDivs.push(<div key={idx}>{msg}</div>);
        }
        return msgInDivs;
    };

    const hasErrorMessages = () => {
        return errorMessages.length !== 0;
    };

    const redirectToClientInfoPageAfter = (clientId, timeInSecond) => {
        const timeInMilliSecond = timeInSecond * 1000;
        setTimeout(() => {
            history.push("/client-information?id=" + clientId);
            window.scrollTo(0, 0);
        }, timeInMilliSecond);
    };

    const redirectToViewClientsPageAfter = (timeInSecond) => {
        const timeInMilliSecond = timeInSecond * 1000;
        setTimeout(() => {
            history.push("view-client?query=clients");
            window.scrollTo(0, 0);
        }, timeInMilliSecond);
    };

    return (
        <form className="edit-client-form">
            <div>
                <div className="client-image" onClick={toggleImageUpload}>
                    {/*TODO: Grab client image from database */}
                    <img src={avatar} alt="client"></img>
                    <div className="upload-banner">Upload Photo</div>
                </div>
                {getImageUploadOnState(showImageUploader)}
            </div>

            <div className="input-field">
                <DropdownList
                    dropdownListItemsKeyValue={zoneList}
                    dropdownName="zone"
                    value={clientInformation.zone}
                    label="Location: "
                    onChange={handleChange}
                />
            </div>
            <div className="input-field">
                <NumberInputField
                    name="villageNumber"
                    value={clientInformation.villageNumber}
                    label="Village Number: "
                    onChange={handleChange}
                />
            </div>
            <hr />
            <div className="input-field">
                <TextInputField
                    name="firstName"
                    value={clientInformation.firstName}
                    label="First Name: "
                    onChange={handleChange}
                />
            </div>
            <div className="input-field">
                <TextInputField
                    name="lastName"
                    value={clientInformation.lastName}
                    label="Last Name: "
                    onChange={handleChange}
                />
            </div>
            <div className="input-field">
                <DateInputField
                    name="birthdate"
                    //TODO: Refactor substring on birthdate information, reduce coupling
                    value={clientInformation.birthdate.substring(0, 10)}
                    label="Birth Date:"
                    onChange={handleChange}
                />
            </div>
            <div className="input-field">
                <DropdownList
                    dropdownName="gender"
                    dropdownListItemsKeyValue={genders}
                    value={clientInformation.gender}
                    label="Gender: "
                    onChange={handleChange}
                />
            </div>
            <hr />
            <div className="input-field">
                <PhoneInputField
                    name="contactNumber"
                    value={clientInformation.contactNumber}
                    label="Contact Number: "
                    onChange={handleChange}
                />
            </div>
            <div className="input-field">
                <PhoneInputField
                    name="caregiverNumber"
                    value={clientInformation.caregiverContact}
                    label="Caregiver Number: "
                    onChange={handleChange}
                />
            </div>
            <hr />
            {/*TODO: Add API calls for update risk and update disability buttons */}
            <div>
                <h1>Risk</h1>
                <RiskInformation
                    riskHistories={clientInformation.riskHistories}
                />
            <div className="input-field-container">
                <div className="label-container">
                    <label>Health Risk:</label>
                </div>
                <NumberInputField
                    name="healthRisk"
                    value={formInputs["healthRisk"]}
                    onChange={formInputChangeHandler}
                />
            </div>
            <div className="input-field-container">
                <div className="label-container">
                    <label>Health Risk Description:</label>
                </div>
                <TextInputField
                    name="healthRiskDescription"
                    value={formInputs["healthRiskDescription"]}
                    onChange={formInputChangeHandler}
                />
            </div>
            <div className="input-field-container">
                <div className="label-container">
                    <label>Health Goal:</label>
                </div>
                <TextInputField
                    name="healthGoal"
                    value={formInputs["healthGoal"]}
                    onChange={formInputChangeHandler}
                />
            </div>
            <div className="input-field-container">
                <div className="label-container">
                    <label>Education Risk:</label>
                </div>
                <NumberInputField
                    name="educationRisk"
                    value={formInputs["educationRisk"]}
                    onChange={formInputChangeHandler}
                />
            </div>
            <div className="input-field-container">
                <div className="label-container">
                    <label>Education Risk Description:</label>
                </div>
                <TextInputField
                    name="educationRiskDescription"
                    value={formInputs["educationRiskDescription"]}
                    onChange={formInputChangeHandler}
                />
            </div>
            <div className="input-field-container">
                <div className="label-container">
                    <label>Education Goal:</label>
                </div>
                <TextInputField
                    name="educationGoal"
                    value={formInputs["educationGoal"]}
                    onChange={formInputChangeHandler}
                />
            </div>
            <div className="input-field-container">
                <div className="label-container">
                    <label>Social Risk:</label>
                </div>
                <NumberInputField
                    name="socialRisk"
                    value={formInputs["socialRisk"]}
                    onChange={formInputChangeHandler}
                />
            </div>
            <div className="input-field-container">
                <div className="label-container">
                    <label>Social Risk Description:</label>
                </div>
                <TextInputField
                    name="socialRiskDescription"
                    value={formInputs["socialRiskDescription"]}
                    onChange={formInputChangeHandler}
                />
            </div>
            <div className="input-field-container">
                <div className="label-container">
                    <label>Social Goal:</label>
                </div>
                <TextInputField
                    name="socialGoal"
                    value={formInputs["socialGoal"]}
                    onChange={formInputChangeHandler}
                />
            </div>
                <input
                    className="btn btn-secondary update-risk-button"
                    type="button"
                    value="Update Risk"
                    onClick={onSubmitRiskHandler}
                />
            </div>
            <hr />
            <div>
                <h1>Disability and Ailment(s)</h1>
                <DisabilityInformation
                    disabilityList={clientInformation.disabled}
                />


                <input
                    className="btn btn-secondary update-disability-button"
                    type="button"
                    value="Update Disability"
                />
            </div>
            <hr />
            {showErrorMessages()}
            {showSuccessMessage()}
            {showDeleteMessage()}

            <div className="action-buttons">
                {/* TODO: restructure css layout for mobile*/}
                <input
                    className="btn btn-secondary"
                    type="button"
                    value="Delete Client"
                    onClick={deleteClientAndPushAllClientPage}
                />
                <input
                    className="btn btn-secondary"
                    type="button"
                    value="Discard Changes"
                    onClick={discardChanges}
                />
                <input
                    className="btn btn-secondary"
                    type="submit"
                    value="Save Changes"
                    onClick={saveChangesAndPushClientInformationPage}
                />
            </div>
        </form>
    );
};

export default EditClientForm;
