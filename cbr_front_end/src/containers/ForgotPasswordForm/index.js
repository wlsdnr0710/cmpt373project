import React, {useState} from 'react';
import Logo from "../../assets/HHALogo.svg";
import LoginInputField from "../../components/LoginInputField";
import "./style.css";

const ForgotPasswordForm = () => {
    
    return (
        <div className="body-form ">
            <img src={Logo} alt="" className="photo" />
            <div className="green-box-background">
                
                <div className="margin-padding"/>
            </div>
        </div>
        
    );

}


export default ForgotPasswordForm;