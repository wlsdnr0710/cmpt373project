import React from "react";
import "./style.css";

const ClientInfoCardAttribute = ({ keyText, valueText }) => {
    return (
        <div className="client-info-card-attribute">
            <div className="key">
                {keyText}
            </div>
            <div className="value">
                {valueText ? valueText : "N/A"}
            </div>
        </div>
    );
};

export default ClientInfoCardAttribute;
