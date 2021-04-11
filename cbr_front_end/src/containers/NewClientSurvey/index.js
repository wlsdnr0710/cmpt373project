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
    isDisabled,
}) => {
    const getClientHealthRiskLevels = () => {
        return {
            "Low": "1",
            "Medium": "2",
            "High": "3",
            "Critical": "4",
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
                    isDisabled={isDisabled}
                />
            </div>

            <div className="section">
                <div className="label-container">
                    <label>What does the client need?:</label>
                </div>
                <TextAreaInputField 
                    name={needInputName} 
                    value={needInputValue} 
                    onChange={onChange} 
                    rows="4" 
                    isDisabled={isDisabled}
                />
            </div>

            <div className="section">
                <div className="label-container">
                    <label>What are the client individual's goals?:</label>
                </div>
                <TextAreaInputField 
                    name={individualGoalsInputName} 
                    value={individualGoalsValue} 
                    onChange={onChange} 
                    rows="4" 
                    isDisabled={isDisabled}
                />
            </div>
        </div>
    );
};

export default NewClientSurvey;
