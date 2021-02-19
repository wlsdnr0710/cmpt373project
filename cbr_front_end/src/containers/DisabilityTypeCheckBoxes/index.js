import React from "react";
import CheckBox from "../../components/CheckBox";

const disabilityTypeCheckBoxes = ({ values, getOnChangeHandlers, isDisabled }) => {
    return (
        <div className="disability-type-check-boxes">
            <CheckBox
                name="Amputee"
                value={values["Amputee"]}
                actionHandler={getOnChangeHandlers("Amputee")}
                displayText={"Amputee"}
                displayTextOnRight
                isDisabled={isDisabled}
            />
            <CheckBox
                name="Polio"
                value={values["Polio"]}
                actionHandler={getOnChangeHandlers("Polio")}
                displayText={"Polio"}
                displayTextOnRight
                isDisabled={isDisabled}
            />
            <CheckBox
                name="Spinal Cord Injury"
                value={values["Spinal Cord Injury"]}
                actionHandler={getOnChangeHandlers("Spinal Cord Injury")}
                displayText={"Spinal Cord Injury"}
                displayTextOnRight
                isDisabled={isDisabled}
            />
            <CheckBox
                name="Cerebral Palsy"
                value={values["Cerebral Palsy"]}
                actionHandler={getOnChangeHandlers("Cerebral Palsy")}
                displayText={"Cerebral Palsy"}
                displayTextOnRight
                isDisabled={isDisabled}
            />
            <CheckBox
                name="Spina Bifida"
                value={values["Spina Bifida"]}
                actionHandler={getOnChangeHandlers("Spina Bifida")}
                displayText={"Spina Bifida"}
                displayTextOnRight
                isDisabled={isDisabled}
            />
            <CheckBox
                name="Hydrocephalus"
                value={values["Hydrocephalus"]}
                actionHandler={getOnChangeHandlers("Hydrocephalus")}
                displayText={"SHydrocephalus"}
                displayTextOnRight
                isDisabled={isDisabled}
            />
            <CheckBox
                name="Other"
                value={values["Other"]}
                actionHandler={getOnChangeHandlers("Other")}
                displayText={"Other"}
                displayTextOnRight
                isDisabled={isDisabled}
            />
        </div>
    );
};

export default disabilityTypeCheckBoxes;
