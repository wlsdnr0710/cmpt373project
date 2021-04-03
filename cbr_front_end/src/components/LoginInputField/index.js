import React, { Component } from 'react';
import "./style.css";

class LoginInputField extends Component {
    render() {
        const { name, value, onChangeValue, type, placeholder } = this.props
        return (
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChangeValue}
                required
                className={"margin-15px"}
            />
        );
    }
}

export default LoginInputField