import React from "react";

const TextAreaInputField = ({ name, rows, cols, value, onChange }) => {
    const getTextAreaInputFieldStyles = () => {
        if (!cols) {
            return {
                width: "100%",
            };
        }
        return null;
    };

    return (
        <textarea 
            name={name} 
            value={value}
            onChange={onChange}
            rows={rows} 
            cols={cols} 
            style={getTextAreaInputFieldStyles()} 
        ></textarea>
    );
};

export default TextAreaInputField;
