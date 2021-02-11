import React from "react";
import DropdownList from "../../components/DropdownList";
import TextAreaInputField from "../../components/TextAreaInputField";
import "./style.css";

const NewClientSurvey = ({ 
    riskInputName, 
    needInputName, 
    individualGoalsInputName, 
    riskValue,
    needInputValue,
    individualGoalsValue,
    onChange,
}) => {
    const getClientHealthRiskLevels = () => {
        return {
            "Low": "low",
            "Medium": "medium",
            "High": "high",
        };
    };

    return (
        <div className="new-client-survey">
            <div className="section">
                <DropdownList 
                    dropdownName={riskInputName}
                    value={riskValue}
                    dropdownListItemsKeyValue={getClientHealthRiskLevels()}
                    onChange={onChange}
                />
            </div>

            <div className="section">
                <div className="label-container">
                    <label>What does the client need?:</label>
                </div>
                <TextAreaInputField name={needInputName} value={needInputValue} onChange={onChange} rows="4" />
            </div>

            <div className="section">
                <div className="label-container">
                    <label>What are the client individual's goals?:</label>
                </div>
                <TextAreaInputField name={individualGoalsInputName} value={individualGoalsValue} onChange={onChange} rows="4" />
            </div>
        </div>
    );
};

export default NewClientSurvey;
