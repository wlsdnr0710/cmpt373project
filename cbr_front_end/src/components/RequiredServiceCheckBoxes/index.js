import React from "react";
import CheckBox from "../../components/CheckBox";

const RequiredServiceCheckBoxes = ({ values, getOnChangeHandlers, isDisabled }) => {

    return (
        <div className="required-service-check-boxes">
            <CheckBox
                name="physiotherapy"
                value={values["physiotherapy"]}
                actionHandler={getOnChangeHandlers("physiotherapy")}
                displayText={"Physiotherapy"}
                displayTextOnRight
                isDisabled={isDisabled}
            />
            <CheckBox
                name="prosthetic"
                value={values["prosthetic"]}
                actionHandler={getOnChangeHandlers("prosthetic")}
                displayText={"Prosthetic"}
                displayTextOnRight
                isDisabled={isDisabled}
            />
            <CheckBox
                name="orthotic"
                value={values["orthotic"]}
                actionHandler={getOnChangeHandlers("orthotic")}
                displayText={"Orthotic"}
                displayTextOnRight
                isDisabled={isDisabled}
            />
            <CheckBox
                name="wheelchair"
                value={values["wheelchair"]}
                actionHandler={getOnChangeHandlers("wheelchair")}
                displayText={"Wheel Chair"}
                displayTextOnRight
                isDisabled={isDisabled}
            />
            <CheckBox
                name="other"
                value={values["other"]}
                actionHandler={getOnChangeHandlers("other")}
                displayText={"Other"}
                displayTextOnRight
                isDisabled={isDisabled}
            />
        </div>
    );
};

export default RequiredServiceCheckBoxes;
