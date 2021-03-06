import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import CheckBox from "../../components/CheckBox";
import TextInputField from "../../components/TextInputField";
import DropdownList from "../../components/DropdownList";
import DateInputField from "../../components/DateInputField";
import avatar from "../../assets/avatar.png";
import NumberInputField from "../../components/NumberInputField";
import PhoneInputField from "../../components/PhoneInputField";
import ImageInputField from "../../components/ImageInputField";
import { getToken } from "../../utils/AuthenticationUtil";
import DisabilityInformation from "../../components/DisabilityInformation";
import "./style.css";
import {
    deleteClientFromServer,
    getClientInformationFromServer,
    getClientObject,
    updateClientInformationToServer,
    getGendersObject,
    getZonesFromServer,
    getDisabilitiesFromServer
} from "../../utils/Utilities";

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
            throw new DOMException("Error could not fetch client information: " + error);
        });
    }, [clientId]);

    const getDisabilities = () => {
        const requestHeader = {
            token: getToken()
        };
        getDisabilitiesFromServer(requestHeader)
        .then(response => {
            setDisabilityList(response.data.data);
        });
    };

    useEffect(() => {
        getClientInformation();
        getZones();
        getDisabilities();
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

    const updateFormInputByNameValue = (name, value) => {
        setFormInputs(prevFormInputs => {
            const newFormInputs = { ...prevFormInputs };
            newFormInputs[name] = value;
            return newFormInputs;
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

    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
    const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const [formInputs, setFormInputs] = useState({
        "clientId": clientId,
        "disabilityType": []
    });

    const [disabilityList, setDisabilityList] = useState({});

    const getDisabilityId = (type) => {
        for (const index in disabilityList) {
            if (disabilityList[index].type === type) {
                return disabilityList[index].id;
            }
        }
    };

    const getDisabilityTypeCheckBoxesOnChangeHandler = type => {
        return event => {
            const checkBox = event.target;
            let checkBoxesValues = formInputs["disabilityType"];
            if (checkBox.checked) {
                checkBoxesValues = [...checkBoxesValues, getDisabilityId(type)];
            } else {
                removeCheckBoxValuesByName(checkBoxesValues, type);
            }
            updateFormInputByNameValue("disabilityType", checkBoxesValues);
        };
    };

    const removeCheckBoxValuesByName = (checkBoxesValues, name) => {
        const matchedItemIndex = checkBoxesValues.indexOf(getDisabilityId(name));
        if (matchedItemIndex !== -1) {
            checkBoxesValues.splice(matchedItemIndex, 1);
        }
    };

    // TODO: add/delete disabilities feature by checkbox
    const createDisabilityCheckboxComponents = () => {
        const disabilityCheckboxComponents = [];
        if(disabilityList === undefined || disabilityList.length === 0) {
            return null;
        }
        else {
            for (const index in disabilityList) {
                const type = disabilityList[index].type;
                const id = disabilityList[index].id;
                disabilityCheckboxComponents.push(<CheckBox
                                                        name={type}
                                                        value={id}
                                                        actionHandler={getDisabilityTypeCheckBoxesOnChangeHandler(type)}
                                                        displayText={type}
                                                        displayTextOnRight={true}
                                                        key={index}
                                                   />
                                                  );
            }
            return disabilityCheckboxComponents;
        }
    };

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
                <PhoneInputField
                    name="contactNumber"
                    value={clientInformation.contactNumber}
                    label="Client Contact Number: "
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
                <TextInputField
                    name="caregiverName"
                    value={clientInformation.caregiverName}
                    label="Caregiver Name: "
                    onChange={handleChange}
                />
            </div>
            <div className="input-field">
                <PhoneInputField
                    name="caregiverNumber"
                    value={clientInformation.caregiverNumber}
                    label="Caregiver Contact Number: "
                    onChange={handleChange}
                />
            </div>
            <hr />
                <h3>Goals</h3>
                <div className="input-field">
                    <TextInputField
                        name="healthGoal"
                        value={clientInformation.healthGoal}
                        label="Health Goal: "
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field">
                    <TextInputField
                        name="socialGoal"
                        value={clientInformation.socialGoal}
                        label="Social Goal: "
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field">
                    <TextInputField
                        name="educationGoal"
                        value={clientInformation.educationGoal}
                        label="Education Goal: "
                        onChange={handleChange}
                    />
                </div>
            <hr />
            <div>
                <h3>Disability and Ailment(s)</h3>
                <DisabilityInformation
                    disabilityList={clientInformation.disabled}
                />

                <div className="input-field-container">
                    <div className="label-container">
                        <label>Disability Type:</label>
                    </div>
                    {createDisabilityCheckboxComponents()}
                </div>

                <input
                    className="btn btn-primary update-disability-button"
                    type="button"
                    value="Edit Disability"
                />
            </div>
            <hr />
            {showErrorMessages()}
            {showSuccessMessage()}
            {showDeleteMessage()}

            <div className="action-buttons">
                {/* TODO: restructure css layout for mobile*/}
                <input
                    className="btn btn-primary"
                    type="button"
                    value="Delete Client"
                    onClick={deleteClientAndPushAllClientPage}
                />
                <input
                    className="btn btn-primary"
                    type="button"
                    value="Discard Changes"
                    onClick={discardChanges}
                />
                <input
                    className="btn btn-primary"
                    type="submit"
                    value="Save Changes"
                    onClick={saveChangesAndPushClientInformationPage}
                />
            </div>
        </form>
    );
};

export default EditClientForm;
