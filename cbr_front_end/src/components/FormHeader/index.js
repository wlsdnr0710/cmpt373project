import React from "react";
import "./style.css";

const FormHeader = ({headerText}) => {
    return (
        <div className="form-header">
            {headerText}
        </div>
    );
};

export default FormHeader;
