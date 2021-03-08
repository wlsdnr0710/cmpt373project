import React, { useState } from "react";
import FormHeader from "../../components/FormHeader";
import RequiredServiceCheckBoxes from "../../components/RequiredServiceCheckBoxes";
import "./style.css";

const NewReferralForm = props => {
    const [formInputs, setFormInputs] = useState({
        "requiredServices": [],
    });

    const requiredServicesKeyValues = {
        "physiotherapy": "1",
        "orthotic": "2",
        "wheelchair": "3",
        "other ": "4",
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
        };
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
            </div>
        </div>
    );
};

export default NewReferralForm;
