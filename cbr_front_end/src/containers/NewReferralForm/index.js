import React, { useState } from "react";
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import CameraSanpshot from "../../containers/CameraSnapshot";
import Card from 'react-bootstrap/Card';
import CheckBox from "../../components/CheckBox";
import DropdownList from "../../components/DropdownList";
import FormHeader from "../../components/FormHeader";
import { getToken } from "../../utils/AuthenticationUtil";
import NumberInputField from "../../components/NumberInputField";
import RequiredServiceCheckBoxes from "../../components/RequiredServiceCheckBoxes";
import ServerConfig from "../../config/ServerConfig";
import Spinner from 'react-bootstrap/Spinner';
import TextAreaInputField from "../../components/TextAreaInputField";
import TextInputField from "../../components/TextInputField";
import "./style.css";

const NewReferralForm = props => {
    const [formInputs, setFormInputs] = useState({
        "requiredServices": [],
        "requiredServiceOtherDescription": "",
        "hipInInches": "",
        "userType": "1",
        "doTheyHaveExistingWheelChair": false,
        "canExistingWheelChairRepaired": false,
        "prostheticCondition" : "1",
        "orthoticCondition": "1",
        "physiotherapyCondition": "1",
        "physiotherapyConditionOtherDesc": "",

    });
    const [showOtherDescription, setShowOtherDescription] = useState(false);
    const [showWheelChairQuestions, setShowWheelChairQuestions] = useState(false);
    const [showExistingWheelChairQuestions, setShowExistingWheelChairQuestions] = useState(false);
    const [showPhysiotherapyQuestions, setShowPhysiotherapyQuestions] = useState(false);
    const [showOrthoticQuestions, setShowOrthoticQuestions] = useState(false);
    const [showProstheticQuestions, setShowProstheticQuestions] = useState(false);
    const [isLoadingSearchResult, setIsLoadingSearchResult] = useState(false);
    const [searchErrorMessage, setSearchErrorMessage] = useState(null);
    const [searchClientId, setSearchClientId] = useState("");
    const [client, setClient] = useState(null);

    const requiredServicesKeyValues = {
        "physiotherapy": "1",
        "prosthetic": "2",
        "orthotic": "3",
        "wheelchair": "4",
        "other": "5",
    };

    const defaultUserTypes = {
        "Basic": "1",
        "Intermediate": "2",
    };

    const defaultOrthoticConditions = {
        "Above elbow": "1",
        "Below elbow": "2",
    };

    const defaultProstheticConditions = {
        "Above knee": "1",
        "Below Knee": "2",
    };

    const defaultPhysiotherapyConditions = {
        "Amputee": "1",
        "Polio": "2",
        "Spinal Cord Injury": "3",
        "Cerebral Palsy": "4",
        "Spina Bifida": "5",
        "Hydrocephalus": "6",
        "Visual Impairment": "7",
        "Hearing Impairment": "8",
        "Other": "9",
    };

    const getRequiredServicesCheckBoxesOnChangeHandler = name => {
        return event => {
            const checkBox = event.target;
            let checkBoxesValues = formInputs["requiredServices"];
            if (checkBox.checked) {
                checkBoxesValues = [...checkBoxesValues, requiredServicesKeyValues[name]];
            } else {
                removeCheckBoxValuesByName(checkBoxesValues, name);
            }
            updateFormInputByNameValue("requiredServices", checkBoxesValues);
            showSubQuestionsFor(checkBoxesValues);
        };
    };

    const showSubQuestionsFor = (checkBoxesValues) => {
        if (isRequiredServiceCheckedByName(checkBoxesValues, "prosthetic")) {
            setShowProstheticQuestions(true);
        } else {
            setShowProstheticQuestions(false);
        }

        if (isRequiredServiceCheckedByName(checkBoxesValues, "orthotic")) {
            setShowOrthoticQuestions(true)
        } else {
            setShowOrthoticQuestions(false)
        }

        if (isRequiredServiceCheckedByName(checkBoxesValues, "physiotherapy")) {
            setShowPhysiotherapyQuestions(true)
        } else {
            setShowPhysiotherapyQuestions(false)
        }

        if (isRequiredServiceCheckedByName(checkBoxesValues, "wheelchair")) {
            setShowWheelChairQuestions(true)
        } else {
            setShowWheelChairQuestions(false)
        }

        if (isRequiredServiceCheckedByName(checkBoxesValues, "other")) {
            setShowOtherDescription(true);
        } else {
            setShowOtherDescription(false);
        }
    };

    const isRequiredServiceCheckedByName = (checkBoxesValues, name) => {
        return checkBoxesValues.indexOf(requiredServicesKeyValues[name]) !== -1;
    };

    const updateFormInputByNameValue = (name, value) => {
        setFormInputs(prevFormInputs => {
            const newFormInputs = { ...prevFormInputs };
            newFormInputs[name] = value;
            return newFormInputs;
        });
    };

    const removeCheckBoxValuesByName = (checkBoxesValues, name) => {
        const matchedItemIndex = checkBoxesValues.indexOf(requiredServicesKeyValues[name]);
        if (matchedItemIndex !== -1) {
            checkBoxesValues.splice(matchedItemIndex, 1);
        }
    };

    const showDescripeOtherRequiredServiceTextArea = () => {
        if (!showOtherDescription) {
            return null;
        }

        return (
            <div>
                <div>Please describe Other:</div>
                <TextAreaInputField 
                    name={"requiredServiceOtherDescription"} 
                    value={formInputs["requiredServiceOtherDescription"]} 
                    onChange={formInputChangeHandler} 
                    rows="4" 
                    isDisabled={false}
                />
            </div>
        );
    };

    const onCheckHaveExistingWheelChair = event => {
        formInputChangeHandler(event);
        const checkBox = event.target;
        setShowExistingWheelChairQuestions(checkBox.checked);
    };

    const showCameraSnapshot = () => {
        if (!isPhotoRequired()) {
            return null;
        }

        return (
            <div className="input-field-container">
                <div>
                    Photo is required.
                </div>
                <CameraSanpshot storeImage={() => {}} />
            </div>
        );
    };

    const isPhotoRequired = () => {
        return showWheelChairQuestions || showPhysiotherapyQuestions;
    };

    const showProstheticQuestionsInputFields = () => {
        if (!showProstheticQuestions) {
            return null;
        }

        return (
            <div>
                <h2>
                    Prosthetic
                </h2>

                <div className="input-field-container">
                    <div>
                        Is injury below or above knee?
                    </div>
                    <DropdownList
                        dropdownName="prostheticConditions"
                        value={formInputs["prostheticConditions"]}
                        dropdownListItemsKeyValue={defaultProstheticConditions}
                        onChange={formInputChangeHandler}
                        isDisabled={false}
                    />
                </div>
                <hr />
            </div>
        );
    };

    const showOrthoticQuestionsInputFields = () => {
        if (!showOrthoticQuestions) {
            return null;
        }

        return (
            <div>
                <h2>
                    Orthotic
                </h2>

                <div className="input-field-container">
                    <div>
                        Is injury below or above elbow?
                    </div>
                    <DropdownList
                        dropdownName="orthoticCondition"
                        value={formInputs["orthoticCondition"]}
                        dropdownListItemsKeyValue={defaultOrthoticConditions}
                        onChange={formInputChangeHandler}
                        isDisabled={false}
                    />
                </div>
                <hr />
            </div>
        );
    };


    const showPhysiotherapyQuestionsInputFields = () => {
        if (!showPhysiotherapyQuestions) {
            return null;
        }

        return (
            <div>
                <h2>
                    Physiotherapy
                </h2>

                <div className="input-field-container">
                    <div>
                        What condition does the client have?
                    </div>
                    <DropdownList
                        dropdownName="physiotherapyCondition"
                        value={formInputs["physiotherapyCondition"]}
                        dropdownListItemsKeyValue={defaultPhysiotherapyConditions}
                        onChange={formInputChangeHandler}
                        isDisabled={false}
                    />
                </div>
                {showDescribeOtherPhysiotherapyTextArea()}
                <hr />
            </div>
        );
    };

    const showDescribeOtherPhysiotherapyTextArea = () => {
        if (formInputs["physiotherapyCondition"] === defaultPhysiotherapyConditions["Other"]) {
            return (
                <div>
                    <div>Please describe Other:</div>
                    <TextAreaInputField 
                        name={"physiotherapyConditionOtherDesc"} 
                        value={formInputs["physiotherapyConditionOtherDesc"]} 
                        onChange={formInputChangeHandler} 
                        rows="4" 
                        isDisabled={false}
                    />
                </div>
            );
        } else {
            return null;
        }
    };

    const showWheelChairQuestionsInputFields = () => {
        if (!showWheelChairQuestions) {
            return null;
        }

        return (
            <div>
                <h2>
                    Wheel Chair
                </h2>

                <div className="input-field-container">
                    <div>
                        Is the user a basic or intermediate user?
                    </div>
                    <DropdownList
                        dropdownName="userType"
                        value={formInputs["userType"]}
                        dropdownListItemsKeyValue={defaultUserTypes}
                        onChange={formInputChangeHandler}
                        isDisabled={false}
                    />
                </div>

                <div className="input-field-container">
                    <div>
                        What is the client's hip width in inches?
                    </div>
                    <NumberInputField
                        name="hipInInches"
                        value={formInputs["hipInInches"]}
                        onChange={formInputChangeHandler}
                        isDisabled={false}
                    />
                </div>

                <div className="input-field-container">
                    <CheckBox
                        name="doTheyHaveExistingWheelChair"
                        value={formInputs["doTheyHaveExistingWheelChair"]}
                        actionHandler={onCheckHaveExistingWheelChair}
                        displayText={"Do they have an existing wheelchair?"}
                        isDisabled={false}
                    />
                </div>
                {showExistingWheelChairQuestionsInputFields()}
                <hr />
            </div>
        );
    };

    const showExistingWheelChairQuestionsInputFields = () => {
        if (!showExistingWheelChairQuestions) {
            return null;
        }

        return (
            <div className="input-field-container">
                <div>
                    <CheckBox
                        name="canExistingWheelChairRepaired"
                        value={formInputs["canExistingWheelChairRepaired"]}
                        actionHandler={formInputChangeHandler}
                        displayText={"Can the existing wheelchair be repaired?"}
                        isDisabled={false}
                    />
                </div>
                <div>
                    <Alert variant="warning">
                        Please bring the wheelchair to the centre.
                    </Alert >
                </div>
            </div>
        );
    };

    const formInputChangeHandler = event => {
        const input = event.target;
        const name = input.name;
        const value = input.value;
        updateFormInputByNameValue(name, value);
    };

    const showClientIDSearchArea = () => {
        return (
            <div>
                <div className="section search">
                    <div className="search-text-input">
                        <TextInputField value={searchClientId} onChange={onSearchClientIdChange} />
                    </div>
                    <div className="search-button">
                        <Button variant="secondary" onClick={onClickSearchClient}>Search Client ID</Button>
                    </div>
                </div>
                {showSearchErrorMessage()}
                {showClientInfo()}
            </div>
        );
    };

    const showSearchErrorMessage = () => {
        if (!searchErrorMessage) {
            return null;
        }

        return (
            <div>
                <Alert variant="danger">
                    {searchErrorMessage}
                </Alert >
            </div>
        );
    };

    const showClientInfo = () => {
        if (isLoadingSearchResult) {
            return (
                <Spinner
                    className="spinner"
                    variant="primary"
                    as="div"
                    animation="grow"
                    size="lg"
                    role="status"
                    aria-hidden="true"
                />
            );
        }

        if (!client) {
            return null;
        }

        return (
            <Card>
                <Card.Header>Client Information</Card.Header>
                <Card.Body>
                    <Card.Title>{client.lastName + ", " + client.firstName}</Card.Title>
                    <div className="client-info-attribute">
                        <div className="attribute-key">ID:</div>
                        <div>{client.id}</div>
                    </div>
                    <div className="client-info-attribute">
                        <div className="attribute-key">Age:</div>
                        <div>{client.age}</div>
                    </div>
                    <div className="client-info-attribute">
                        <div className="attribute-key">Zone:</div>
                        <div>{client.zoneName.name}</div>
                    </div>
                </Card.Body>
            </Card>
        );
    };

    const onSearchClientIdChange = event => {
        const searchBox = event.target;
        const value = searchBox.value;
        setSearchClientId(value);
    };

    const onClickSearchClient = event => {
        event.preventDefault();
        if (searchClientId === "" || isNaN(searchClientId)) {
            setSearchErrorMessage("Please enter a numeric client ID");
            return;
        }

        const requestHeader = {
            token: getToken()
        };
        setIsLoadingSearchResult(true);
        setSearchErrorMessage(null);
        setClient(null);
        axios.get(
                ServerConfig.api.url + "/api/v1/client/" + searchClientId, 
                {
                    headers: requestHeader,
                }
            )
            .then(response => {
                const receivedClient = response.data.data;
                setClient(receivedClient);
            })
            .catch(error => {
                const errorMessage = error.response.data.message;
                setSearchErrorMessage(errorMessage);
            })
            .then(() => {
                setIsLoadingSearchResult(false);
            });
    };

    return (
        <div className="new-referral-form">
            <FormHeader
                headerText="New Referral"
            />
            {showClientIDSearchArea()}
            <div className="form-body">
                <div className="input-field-container">
                    <h2>
                        Required Services
                    </h2>
                    <RequiredServiceCheckBoxes 
                        values={formInputs["requiredServices"]}
                        getOnChangeHandlers={getRequiredServicesCheckBoxesOnChangeHandler}
                        isDisabled={false}
                    />
                    <hr />
                </div>

                {showDescripeOtherRequiredServiceTextArea()}
                {showCameraSnapshot()}
                {showProstheticQuestionsInputFields()}
                {showOrthoticQuestionsInputFields()}
                {showPhysiotherapyQuestionsInputFields()}
                {showWheelChairQuestionsInputFields()}

                <div>
                    <Button variant="primary" onClick={()=>{}}>Submit</Button>
                </div>
            </div>
        </div>
    );
};

export default NewReferralForm;
