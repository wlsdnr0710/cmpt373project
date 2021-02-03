import React from "react";
import "./style.css"

const ImageInputField = ({ id, primaryText, secondaryText, isDisabled }) => {
    const onClickToUploadHandler = () => {
        document.querySelector(".image-input-field input#" + id).click()  ;
    };

    return (
        <div className="image-input-field" onClick={onClickToUploadHandler}>
            <input type="file" accept="image/*" id={id} disabled={isDisabled} />
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
