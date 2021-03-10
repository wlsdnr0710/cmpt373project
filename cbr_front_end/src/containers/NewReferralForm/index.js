import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import CameraSanpshot from "../../containers/CameraSnapshot";
import CheckBox from "../../components/CheckBox";
import DropdownList from "../../components/DropdownList";
import FormHeader from "../../components/FormHeader";
import NumberInputField from "../../components/NumberInputField";
import RequiredServiceCheckBoxes from "../../components/RequiredServiceCheckBoxes";
import TextAreaInputField from "../../components/TextAreaInputField";
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
                <hr />
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
                <hr />
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
                <hr />
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
                <hr />
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

    return (
        <div className="new-referral-form">
            <FormHeader
                headerText="New Referral"
            />
            
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
                </div>
                {showDescripeOtherRequiredServiceTextArea()}
                {showCameraSnapshot()}
                {showProstheticQuestionsInputFields()}
                {showOrthoticQuestionsInputFields()}
                {showPhysiotherapyQuestionsInputFields()}
                {showWheelChairQuestionsInputFields()}
            </div>
        </div>
    );
};

export default NewReferralForm;
