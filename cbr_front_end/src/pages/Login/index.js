import React, { Component } from 'react';
import axios from 'axios';
import { isAuthenticated, saveToken } from "../../utils/AuthenticationUtil";
import LoginInputField from "../../components/LoginInputField";
import CheckBox from "../../components/CheckBox"
import Logo from "../../assets/HHALogo.svg";
import ServerConfig from "../../config/ServerConfig";
import "./style.css";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            rememberMyPass: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRememberPassCheckbox = this.handleRememberPassCheckbox.bind(this);
        this.handleCreateAccount = this.handleCreateAccount.bind(this);
    }

    componentDidMount() {
        if (isAuthenticated()) {
            this.redirectToHomePage();
        }
    }

    redirectToHomePage() {
        this.props.history.push("/home");
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleRememberPassCheckbox(event){
        this.setState(prevState => ({
            rememberMyPass : !prevState.rememberMyPass
        }));
    }

    handleSubmit(event) {
        const { username, password, rememberMyPass } = this.state;
        axios.post(
            ServerConfig.api.url + '/api/v1/authentication/worker',
            {
                username: username,
                password: password,
                rememberMyPass: rememberMyPass
            }
        )
            .then(response => {
                const token = response.data.data;
                saveToken(token);
                this.redirectToHomePage();
            })
            .catch(error => {
                this.setState({ errorMessage: error.response.data.message });
            });
        event.preventDefault();
    }

    handleCreateAccount(event) {
        this.props.history.push("/create-account");
    }

    onClickForgotPassword = () => {
        this.props.history.push("/OTP-verification");
    }

    render() {
        return (
            <div className="center" >
                <img src={Logo} alt="" className="photo" />
                <form onSubmit={this.handleSubmit} className="login-form centerItems">
                    <LoginInputField
                        value={this.state.username}
                        onChangeValue={this.handleChange}
                        name="username"
                        type="username"
                        placeholder="Username"
                    />
                    <LoginInputField
                        value={this.state.password}
                        onChangeValue={this.handleChange}
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    <CheckBox
                            name="rememberMyPass"
                            value={this.state.rememberMyPass}
                            actionHandler={this.handleRememberPassCheckbox}
                            displayText="Remember my password"
                        />
                    <div className="forgot-pass" onClick={this.onClickForgotPassword}>
                        Forgot my password
                    </div>
                    <button type="submit" className="login-font">Sign In</button>
                    {this.state.errorMessage &&
                        <h3 className="error"> {this.state.errorMessage} </h3>}
                    <button onClick={this.handleCreateAccount} className="create-account-button">Create Account</button>
                </form>
                
            </div >
        )
    }
}
