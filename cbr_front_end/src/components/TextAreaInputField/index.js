import React from "react";

const TextAreaInputField = ({ name, rows, cols }) => {
    const getTextAreaInputFieldStyles = () => {
        if (!cols) {
            return {
                width: "100%",
            };
        }
        return null;
    };

    return (
        <textarea name={name} rows={rows} cols={cols} style={getTextAreaInputFieldStyles()} ></textarea>
    );
};

export default TextAreaInputField;
