import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Logo from "./HHALogo.svg"
import "./style.css"
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
            })
            .catch(error => {
                console.log("Login error: ", error);
            });
        event.preventDefault();
    }

    render() {
        return (

            <div>
                <img src={Logo} className="photo" />

                <form onSubmit={this.handleSubmit} className="center">
                    <input
                        type="username"
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div >
        )
    }
}

