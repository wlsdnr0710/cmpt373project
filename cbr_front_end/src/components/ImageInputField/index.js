import React from "react";
import "./style.css";

const ImageInputField = ({ id, primaryText, secondaryText, isDisabled, reference }) => {
    const onClickToUploadHandler = () => {
        document.querySelector(".image-input-field input#" + id).click()  ;
    };

    const getDisabledClassName = () => {
        if (isDisabled) {
            return "disabled";
        } else {
            return "";
        }
    };

    return (
        <div className={"image-input-field " + getDisabledClassName()} onClick={onClickToUploadHandler}>
            <input type="file" accept="image/*" id={id} disabled={isDisabled} ref={reference} />
            <div className="primary-text">
                <label>{primaryText}</label>
            </div>
            <div className="secondary-text">
                <label>{secondaryText}</label>
            </div>
        </div>
    );
};

export default ImageInputField;
