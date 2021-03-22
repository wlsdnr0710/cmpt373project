import React, {useState, Component} from 'react';
import {useLocation} from 'react-router-dom'
import Logo from "../../assets/HHALogo.svg";
import qs from "query-string"
import firebase from "../../config/FirebaseConfig"
import "./style.css";

const OTPVerificationForm = () => {
    const location = useLocation();
    const dialingCodeForUganda = "+1";
    const parseQueryData = () => {
        const parameterString = location.search;
        const queryData = qs.parse(parameterString).query;
        return queryData;
    }

    const handleClick = () => {
        let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
        let number = dialingCodeForUganda + parseQueryData();
        firebase.auth().signInWithPhoneNumber(number, recaptcha)
            .then (function (e){
                let code = prompt('enter the code', '');
                if (code == null) return;
                e.confirm(code).then(function(result){
                    console.log(result.user, 'user');
                }).catch((error)=>{
                    console.log(error);
                    
                })
            })
    }

    const reloadCaptchaVerifification = () => {
        window.location.reload();
    }

    return (
        <div >
            <div id="recaptcha"></div>
            <button onClick={handleClick}>
                Click here for captcha
            </button>
            <button onClick={reloadCaptchaVerifification} hidden={true}>
                Click here to reset
            </button>
        </div>
    );

}


export default OTPVerificationForm;