import React, { Component } from 'react';

class InputBar extends Component {
    render() {
        const { value, onChangeValue, type, placeholder } = this.props
        return (
            <input
                type={type}
                name={type}
                placeholder={placeholder}
                value={value}
                onChange={onChangeValue}
                required
            />
        );
    }
}

export default InputBar