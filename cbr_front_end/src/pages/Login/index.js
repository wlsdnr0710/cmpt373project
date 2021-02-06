import React, { Component } from 'react';
import axios from 'axios';
import LoginInputField from "../../components/LoginInputField";
import Logo from "../../assets/HHALogo.svg";
import "./style.css";


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    redirectToDashboard() {
        this.props.history.push("/dashboard");
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const { username, password } = this.state;
        axios.post(
            //Springboot API link
            "http://",
            {
                user: {
                    username: username,
                    password: password
                }
            },
            { withCredentials: true }
        )
            .then(response => {
                this.redirectToDashboard();
            })
            .catch(error => {
                this.setState({ errorMessage: error.message });
            });
        event.preventDefault();
    }

    render() {
        return (
            <div className="center">
                <img src={Logo} className="photo" />
                <form onSubmit={this.handleSubmit} className="centerItems">
                    <LoginInputField
                        value={this.state.username}
                        onChangeValue={this.handleChange}
                        type="username"
                        placeholder="Username"
                    />
                    <LoginInputField
                        value={this.state.password}
                        onChangeValue={this.handleChange}
                        type="password"
                        placeholder="Password"
                    />
                    <button type="submit" className="login-font">Sign In</button>
                    {this.state.errorMessage &&
                        <h3 className="error"> {this.state.errorMessage} </h3>}
                </form>
            </div >
        )
    }
}

