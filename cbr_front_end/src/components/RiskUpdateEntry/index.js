import React from "react";
import { parseISODateStringToDateString } from "../../utils/Utilities";
import "./style.css"

const RiskDateInformation = (date) => {
    return (
        <div>
            Created: {parseISODateStringToDateString(date)} <hr />
        </div>
    );
};

const RiskUpdateEntry = ({ riskObject }) => {
    return (
        <div className="risk-update-card">
            <div className="risk-entry">
                {RiskDateInformation(riskObject.createdDate)}
            </div>
            <div className="risk-entry">
                <strong>Health </strong>: {riskObject.healthRisk}
                <div className="risk-description">
                    {riskObject.healthRiskDescription}
                </div>
            </div>
            <div className="risk-entry">
                <strong>Education </strong>: {riskObject.educationRisk}
                <div className="risk-description">
                    {riskObject.educationRiskDescription}
                </div>
            </div>
            <div className="risk-entry">
                <strong>Social </strong>: {riskObject.socialRisk}
                <div className="risk-description">
                    {riskObject.socialRiskDescription}
                </div>
            </div>
        </div>
    );
};

export default RiskUpdateEntry;
