import React from "react";
import "./style.css";

const BackgroundCard = ({children, heading}) => {
  return (
    <div className="background-card">
      <div className="background-top">
          <h1 className ="background-top-heading">{heading}</h1>
      </div>
      {children}
    </div>
  );
}

export default BackgroundCard;
