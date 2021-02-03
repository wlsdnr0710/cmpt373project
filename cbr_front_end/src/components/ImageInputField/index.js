import React from "react";
import "./style.css"

const ImageInputField = ({ primaryText, secondaryText }) => {
    const onClickToUploadHandler = () => {
        document.querySelector(".image-input-field input").click()  ;
    };

    return (
        <div className="image-input-field" onClick={onClickToUploadHandler}>
            <input type="file" accept="image/*" />
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
