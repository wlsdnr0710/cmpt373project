import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
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
                <h1>Status: {this.props.loggedInStatus}</h1>
                <button onClick={() => this.handleLogoutClick()}>Logout</button>

            </div>
        )
    }
}

