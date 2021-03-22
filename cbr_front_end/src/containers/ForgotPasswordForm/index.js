import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import Logo from "../../assets/HHALogo.svg";
import firebase from "../../config/FirebaseConfig"
import NumberInputField from "../../components/NumberInputField"
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