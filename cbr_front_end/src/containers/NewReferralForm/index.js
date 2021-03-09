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
        "userType": "basic",
        "doTheyHaveExistingWheelChair": false,
        "canExistingWheelChairRepaired": false,

    });
    const [showOtherDescription, setShowOtherDescription] = useState(false);
    const [showWheelChairQuestions, setShowWheelChairQuestions] = useState(false);
    const [showExistingWheelChairQuestions, setShowExistingWheelChairQuestions] = useState(false);

    const requiredServicesKeyValues = {
        "physiotherapy": "1",
        "orthotic": "2",
        "wheelchair": "3",
        "other": "4",
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

            if (isRequiredServiceCheckedByName(checkBoxesValues, "other")) {
                setShowOtherDescription(true);
            } else {
                setShowOtherDescription(false);
            }

            if (isRequiredServiceCheckedByName(checkBoxesValues, "wheelchair")) {
                setShowWheelChairQuestions(true)
            } else {
                setShowWheelChairQuestions(false)
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

    const showOtherDescriptionTextarea = () => {
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

    const defaultUserType = {
        "Basic": "basic",
        "Intermediate": "intermediate",
    };

    const onCheckHaveExistingWheelChair = event => {
        formInputChangeHandler(event);
        const checkBox = event.target;
        setShowExistingWheelChairQuestions(checkBox.checked);
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
                    <CameraSanpshot storeImage={() => {}} />
                </div>

                <div className="input-field-container">
                    <div>
                        Is the user a basic or intermediate user?
                    </div>
                    <DropdownList
                        dropdownName="userType"
                        value={formInputs["userType"]}
                        dropdownListItemsKeyValue={defaultUserType}
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
                {showOtherDescriptionTextarea()}
                {showWheelChairQuestionsInputFields()}
            </div>
        </div>
    );
};

export default NewReferralForm;
