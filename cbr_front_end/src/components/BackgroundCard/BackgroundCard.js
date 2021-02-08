import React from "react";
import "./style.css";

function BackgroundCard(props) {
  return (
    <div className="background-card">
      <div className="background-top">
          <h1 className ="background-top-heading">{props.heading}</h1>
      </div>
      {props.children}
    </div>
  );
}

export default BackgroundCard;
