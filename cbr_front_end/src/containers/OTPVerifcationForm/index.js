import React, {useState, Component} from 'react';
import Logo from "../../assets/HHALogo.svg";
import qs from "query-string"
import firebase from "../FirebaseOTP/index"
import "./style.css";

const OTPVerificationForm = (location) => {
    const [contactNumber, setContactNumber] = useState();
    const parseQueryData = () => {
        const parameterString = location.search;
        const queryData = qs.parse(parameterString).query;
        return queryData;
    }

    const handleClick = () => {
        let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
        let number = "+17786811579";
        setContactNumber(number);
        firebase.auth().signInWithPhoneNumber(number, recaptcha)
            .then (function (e){
                let code = prompt('enter the code', '');
                if (code == null) return;
                e.confirm(code).then(function(result){
                    console.log(result.user, 'user');
                    document.querySelector('label').textContent = result.user.phoneNumber + "Number verified";
                }).catch((error)=>{
                    console.log(error);
                })
            })
    }

    return (
        <div >
            <div id="recaptcha"></div>
            <button onClick={handleClick}>
                Click here
            </button>
        </div>
    );

}


export default OTPVerificationForm;