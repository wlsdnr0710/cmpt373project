import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import Logo from "../../assets/HHALogo.svg";
import axios from 'axios';
import { saveToken } from "../../utils/AuthenticationUtil";
import firebase from "../../config/FirebaseConfig"
import ServerConfig from "../../config/ServerConfig";
import NumberInputField from "../../components/NumberInputField"
import "./style.css";

const OTPVerifcationForm = () => {
    const history = useHistory();
    // Change when demo - +1
    const dialingCodeForUganda = "+256";
    const [contactNumber, setContactNumber] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [hideCaptcha, setHideCaptcha] = useState(false);

    const contactNumberHandler = event => {
        if (!hasSubmitted){
            const input = event.target;
            const value = input.value;
            setContactNumber(value);
        }
    }

    const redirectToForgotPasswordForm = () => {
        history.push("/forgot-password");
    }

    const submitFormByPostRequest = idToken => {
        axios.post(ServerConfig.api.url + '/api/v1/authentication/worker-phone', 
            {
                contactNumber: contactNumber,
                firebaseVerifyCode: idToken
            })
            .then(response => {
                const token = response.data.data;
                saveToken(token);
                redirectToForgotPasswordForm();
            })
            .catch(error => {
                setErrorMessage("Invalid Request from server side");
                handleErrorCatch(error);
            })
    };

    /* Ensure that the captcha would be hidden after the first captcha invalidation
       to prevent invalid uses of the captcha. 
       */
    const handleClick = () => {
        setHasSubmitted(!hasSubmitted);
        let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
        let number = dialingCodeForUganda + contactNumber;
        firebase.auth().signInWithPhoneNumber(number, recaptcha)
            .then (function (result){
                //TODO: change and add labels/text for style
                let code = prompt('enter the code', '');
                if (code == null) return;
                
                // Verify in front-end to reduce load on back-end
                // Only do final firebase verification in back-end for security purposes
                result.confirm(code)
                .then(function(e){
                    firebase.auth().currentUser.getIdToken(true)
                    .then(function(idToken){
                        submitFormByPostRequest(idToken);
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                })
                .catch(error=>{
                    handleErrorCatch(error);
                })
            })
            .catch(error => {
                handleErrorCatch(error);
            })
    }
    
    const handleErrorCatch = (error) => {
        setErrorMessage(error.code);
        setHideCaptcha(!hideCaptcha);
    }

    const reloadCaptchaVerifification = () => {
        window.location.reload();
    }

    const backButtonHandler = () => {
        history.push("/login");
    }

    return (
        <div className="body-form ">
            <img src={Logo} alt="" className="photo" />
            <div className="green-box-background">
                <div className="forgot-pass-font " >
                    Phone number of account:
                </div>
                <NumberInputField
                        name="contactNumber"
                        value={contactNumber}
                        onChange={contactNumberHandler}
                        isDisabled={false}
                    />
                <div className={"margin-10px"} id="recaptcha" hidden={hideCaptcha}></div>
                <div hidden={!hasSubmitted} className={"margin-10px error-message"}>
                    {errorMessage}
                </div>
                <div>
                    <button className="cred-button" onClick={handleClick} hidden={hasSubmitted}>
                        Verify
                    </button>
                    <button className="cred-button"  onClick={reloadCaptchaVerifification} hidden={!hasSubmitted}>
                        Reset
                    </button>
                    <button className="back-button"  onClick={backButtonHandler}>
                        Back
                    </button>
                </div>
                <div className="background-margin-padding"/>
            </div>
        </div>
    );
}

export default OTPVerifcationForm;