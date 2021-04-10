import React from "react";
import "./style.css";

const BackgroundCard = ({children, heading, className}) => {
    let cardStyling = "background-card " + className;
    
    return (
        <div className={cardStyling} >
            <div className="background-top">
                <h1 className ="background-top-heading">{heading}</h1>
            </div>
            {children}
        </div>
    );
}

export default BackgroundCard;
