import React from "react";
import "./style.css";

function BackgroundCard(props) {
  return (
    <div className="card">
      <div className="top">
          <h1 className ="top-heading">{props.heading}</h1>
      </div>
      {props.children}
    </div>
  );
}

export default BackgroundCard;
