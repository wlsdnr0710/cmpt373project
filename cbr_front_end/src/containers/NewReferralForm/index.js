import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import CameraSnapshot from "../../containers/CameraSnapshot";
import CheckBox from "../../components/CheckBox";
import DropdownList from "../../components/DropdownList";
import FormHeader from "../../components/FormHeader";
import {
    getPhysiotherapyConditionsFromServer,
    getDefaultWheelchairUserTypes,
    getDefaultOrthoticConditions,
    getDefaultProstheticConditions,
    getRequiredServicesKeyValues,
    postNewReferrals
} from "../../utils/Utilities";
import { getToken, getWorkerIdFromToken } from "../../utils/AuthenticationUtil";
import NumberInputField from "../../components/NumberInputField";
import RequiredServiceCheckBoxes from "../../components/RequiredServiceCheckBoxes";
import Spinner from 'react-bootstrap/Spinner';
import TextAreaInputField from "../../components/TextAreaInputField";
import "./style.css";

const NewReferralForm = props => {
    const history = useHistory();
    const [formInputs, setFormInputs] = useState({
        "requiredServices": [],
        "requiredServiceOtherDescription": "",
        "hipWidthInInches": "",
        "wheelchairUserType": "BASIC",
        "doTheyHaveExistingWheelchair": false,
        "canExistingWheelchairRepaired": false,
        "prostheticCondition": "BELOW_KNEE",
        "orthoticCondition": "BELOW_ELBOW",
        "physiotherapyCondition": "",
        "physiotherapyConditionOtherDesc": "",
        "isResolved": false,
        "workerId": getWorkerIdFromToken(getToken())
    });
    const [showOtherDescription, setShowOtherDescription] = useState(false);
    const [showWheelchairQuestions, setShowWheelchairQuestions] = useState(false);
    const [showExistingWheelchairQuestions, setShowExistingWheelchairQuestions] = useState(false);
    const [showPhysiotherapyQuestions, setShowPhysiotherapyQuestions] = useState(false);
    const [showOrthoticQuestions, setShowOrthoticQuestions] = useState(false);
    const [showProstheticQuestions, setShowProstheticQuestions] = useState(false);
    const clientId = props.clientId;

    const [isFormDisabled, setIsFormDisabled] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const requiredServicesKeyValues = getRequiredServicesKeyValues();
    const wheelchairUserTypes = getDefaultWheelchairUserTypes();
    const defaultOrthoticConditions = getDefaultOrthoticConditions();
    const defaultProstheticConditions = getDefaultProstheticConditions();

    const [physiotherapyConditions, setPhysiotherapyConditions] = useState({});
    useEffect(() => {
        const requestHeader = {
            token: getToken()
        };
        getPhysiotherapyConditionsFromServer(requestHeader)
            .then(response => {
                const data = response.data.data;
                const conditions = {};
                for (let i = 0; i < data.length; i++) {
                    const condition = data[i];
                    conditions[condition["type"]] = condition["id"];
                }
                setPhysiotherapyConditions(conditions);
                setDefaultPhysiotherapyConditionId(data[0]["id"]);
            })
            .catch(error => {

            });
    }, []);

    const setDefaultPhysiotherapyConditionId = defaultConditionId => {
        updateFormInputByNameValue("physiotherapyCondition", defaultConditionId);
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

    const requiredServiceMapNameToSetter = {
        "prosthetic": setShowProstheticQuestions,
        "orthotic": setShowOrthoticQuestions,
        "physiotherapy": setShowPhysiotherapyQuestions,
        "wheelchair": setShowWheelchairQuestions,
        "other": setShowOtherDescription,
    };

    const showSubQuestionsFor = (checkBoxesValues) => {
        for (const name in requiredServiceMapNameToSetter) {
            const setter = requiredServiceMapNameToSetter[name];
            if (isRequiredServiceCheckedByName(checkBoxesValues, name)) {
                setter(true);
            } else {
                setter(false);
            }
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

    const showDescribeOtherRequiredServiceTextArea = () => {
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

    const onCheckHaveExistingWheelchair = event => {
        formInputChangeHandler(event);
        const checkBox = event.target;
        setShowExistingWheelchairQuestions(checkBox.checked);
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
                <CameraSnapshot storeImage={() => { }} />
            </div>
        );
    };

    const isPhotoRequired = () => {
        return showWheelchairQuestions || showPhysiotherapyQuestions;
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
                        Is the injury below or above the knee?
                    </div>
                    <DropdownList
                        dropdownName="prostheticCondition"
                        value={formInputs["prostheticCondition"]}
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
                        Is the injury below or above the elbow?
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
                        dropdownListItemsKeyValue={physiotherapyConditions}
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
        if (formInputs["physiotherapyCondition"] === physiotherapyConditions["Other"]) {
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

    const showWheelchairQuestionsInputFields = () => {
        if (!showWheelchairQuestions) {
            return null;
        }

        return (
            <div>
                <h2>
                    Wheelchair
                </h2>

                <div className="input-field-container">
                    <div>
                        Is the user a basic or intermediate user?
                    </div>
                    <DropdownList
                        dropdownName="wheelchairUserType"
                        value={formInputs["wheelchairUserType"]}
                        dropdownListItemsKeyValue={wheelchairUserTypes}
                        onChange={formInputChangeHandler}
                        isDisabled={false}
                    />
                </div>

                <div className="input-field-container">
                    <div>
                        What is the client's hip width in inches?
                    </div>
                    <NumberInputField
                        name="hipWidthInInches"
                        value={formInputs["hipWidthInInches"]}
                        onChange={formInputChangeHandler}
                        isDisabled={false}
                    />
                </div>

                <div className="input-field-container">
                    <CheckBox
                        name="doTheyHaveExistingWheelchair"
                        value={formInputs["doTheyHaveExistingWheelchair"]}
                        actionHandler={onCheckHaveExistingWheelchair}
                        displayText={"Do they have an existing wheelchair?"}
                        isDisabled={false}
                    />
                </div>
                {showExistingWheelchairQuestionsInputFields()}
                <hr />
            </div>
        );
    };

    const showExistingWheelchairQuestionsInputFields = () => {
        if (!showExistingWheelchairQuestions) {
            return null;
        }

        return (
            <div className="input-field-container">
                <div>
                    <CheckBox
                        name="canExistingWheelchairRepaired"
                        value={formInputs["canExistingWheelchairRepaired"]}
                        actionHandler={formInputChangeHandler}
                        displayText={"Can the existing wheelchair be repaired?"}
                        isDisabled={false}
                    />
                </div>
                <div>
                    <Alert variant="warning">
                        Please bring the wheelchair to the centre.
                    </Alert>
                </div>
            </div>
        );
    };

    const formInputChangeHandler = event => {
        const input = event.target;
        const name = input.name;
        let value = null;
        if (input.type === "checkbox") {
            value = input.checked;
        } else {
            value = input.value;
        }
        updateFormInputByNameValue(name, value);
    };

    const onSubmitHandler = event => {
        event.preventDefault();
        setStatesDuringSubmitting();
        const requestHeader = {
            token: getToken()
        };

        const data = { ...formInputs };
        data["clientId"] = clientId;

        postNewReferrals(data, requestHeader)
            .then(response => {
                setStatesWhenSuccess();
                const oneSecond = 1;
                redirectToClientInfoPageAfter(clientId, oneSecond);
            })
            .catch(error => {
                setStatesWhenFail();
                updateErrorMessages(error);
            });
    };

    const redirectToClientInfoPageAfter = (clientId, timeInSecond) => {
        const timeInMilliSecond = timeInSecond * 1000;
        setTimeout(() => {
            history.push("/client-information?id=" + clientId);
            window.scrollTo(0, 0);
        }, timeInMilliSecond);
    };

    const showSuccessMessage = () => {
        if (!isSuccess) {
            return null;
        } else {
            return (
                <Alert variant="success">
                    The referral form is successfully submitted!
                </Alert>
            );
        }
    };

    const setStatesDuringSubmitting = () => {
        setIsSuccess(false);
        setErrorMessages([]);
        setIsFormDisabled(true);
        setIsSubmitting(true);
    };

    const setStatesWhenSuccess = () => {
        setIsSuccess(true);
        setIsFormDisabled(false);
        setIsSubmitting(false);
    };

    const setStatesWhenFail = () => {
        setIsFormDisabled(false);
        setIsSubmitting(false);
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

    const getSubmitButtonText = () => {
        if (isSubmitting) {
            return (
                <div className="spinning-submit-button-text">
                    <Spinner
                        className="spinner"
                        as="div"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Submitting
                </div>
            );
        } else {
            return "Submit";
        }
    };

    return (
        <div>
            <FormHeader
                headerText="New Referral"
            />
            <div className="new-referral-form">
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

                {showDescribeOtherRequiredServiceTextArea()}
                {showCameraSnapshot()}
                {showProstheticQuestionsInputFields()}
                {showOrthoticQuestionsInputFields()}
                {showPhysiotherapyQuestionsInputFields()}
                {showWheelchairQuestionsInputFields()}

                <div>
                    <CheckBox
                        name="isResolved"
                        value={formInputs["isResolved"]}
                        actionHandler={formInputChangeHandler}
                        displayText={"Is the referral resolved?"}
                        isDisabled={false}
                    />
                </div>

                <div>
                    <Button variant="primary" onClick={onSubmitHandler}>
                        {getSubmitButtonText()}
                    </Button>
                </div>

                <div className="feedback-messages">
                    {showSuccessMessage()}
                    {showErrorMessages()}
                </div>
            </div>
        </div>
    );
};

export default NewReferralForm;
