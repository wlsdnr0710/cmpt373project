import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Dashboard from "../Dashboard/index";
import LoginInputField from "../../components/LoginInputField/index";
import Logo from "../../assets/HHALogo.svg";
import "./style.css";

function redirectToDashboard() {
    return (<Redirect to="/dashboard" />);
}

export default class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
                console.log("Logged in response: ", response);
                //Switch to dashboard
                redirectToDashboard();
                /////////////////////
            })
            .catch(error => {
                console.log("Login error: ", error);
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

