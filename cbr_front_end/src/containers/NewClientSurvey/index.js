import React from "react";
import DropdownList from "../../components/DropdownList";
import TextAreaInputField from "../../components/TextAreaInputField";
import "./style.css";

const NewClientSurvey = ({ surveyType }) => {
    const getClientHealthRiskLevels = () => {
        return {
            "Low": "low",
            "Medium": "medium",
            "High": "high",
        };
    };

    const healthTypeSurveyInputNames = {
        risk: "client-health-risk",
        clientNeed: "client-health-risk-need",
        individualGoals: "client-health-risk-individual-goals",
    };

    const socialTypeSurveyInputNames = {
        risk: "client-social-risk",
        clientNeed: "client-social-risk-need",
        individualGoals: "client-social-risk-individual-goals",
    };

    const educationTypeSurveyInputNames = {
        risk: "client-education-risk",
        clientNeed: "client-education-risk-need",
        individualGoals: "client-education-risk-individual-goals",
    };

    const getSurveryTypeInputNames = () => {
        if (surveyType === "health") {
            return healthTypeSurveyInputNames;
        } else if (surveyType === "social") {
            return socialTypeSurveyInputNames;
        } else if (surveyType === "education") {
            return educationTypeSurveyInputNames;
        } else {
            return null;
        }
    };

    return (
        <div className="new-client-survey">
            <div className="section">
                <DropdownList 
                    dropdownName={getSurveryTypeInputNames().risk}
                    dropdownListItemsKeyValue={getClientHealthRiskLevels()}
                />
            </div>

            <div className="section">
                <div className="label-container">
                    <label>What does the client need?:</label>
                </div>
                <TextAreaInputField name={getSurveryTypeInputNames().clientNeed} rows="4" />
            </div>

            <div className="section">
                <div className="label-container">
                    <label>What are the client individual's goals?:</label>
                </div>
                <TextAreaInputField name={getSurveryTypeInputNames().individualGoals} rows="4" />
            </div>
        </div>
    );
};

export default NewClientSurvey;
