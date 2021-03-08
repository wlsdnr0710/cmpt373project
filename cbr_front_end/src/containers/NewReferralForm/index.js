import React, { useState } from "react";
import FormHeader from "../../components/FormHeader";
import RequiredServiceCheckBoxes from "../../components/RequiredServiceCheckBoxes";
import TextAreaInputField from "../../components/TextAreaInputField";
import "./style.css";

const NewReferralForm = props => {
    const [formInputs, setFormInputs] = useState({
        "requiredServices": [],
        "requiredServiceOtherDescription": "",
    });
    const [showOtherDescription, setShowOtherDescription] = useState(false);

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

            if (isRequiredServiceOtherChecked(checkBoxesValues)) {
                setShowOtherDescription(true);
            } else {
                setShowOtherDescription(false);
            }
        };
    };

    const isRequiredServiceOtherChecked = checkBoxesValues => {
        return checkBoxesValues.indexOf(requiredServicesKeyValues["other"]) !== -1;
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
                <div>Please describe:</div>
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
                <RequiredServiceCheckBoxes 
                    values={formInputs["requiredServices"]}
                    getOnChangeHandlers={getRequiredServicesCheckBoxesOnChangeHandler}
                    isDisabled={false}
                />
                {showOtherDescriptionTextarea()}
            </div>
        </div>
    );
};

export default NewReferralForm;
