import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import Logo from "../../assets/HHALogo.svg";
import firebase from "../../config/FirebaseConfig"
import NumberInputField from "../../components/NumberInputField"
import "./style.css";

const OTPVerifcationForm = () => {
    const history = useHistory();
    const dialingCodeForUganda = "+1";
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

    /* Ensure that the captcha would be hidden after the first captcha invalidation
       to prevent invalid uses of the captcha. */
    const handleClick = () => {
        setHasSubmitted(!hasSubmitted);
        let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
        let number = dialingCodeForUganda + contactNumber;
        firebase.auth().signInWithPhoneNumber(number, recaptcha)
            .then (function (result){
                //TODO: change and add labels/text for style
                let code = prompt('enter the code', '');
                if (code == null) return;
                result.confirm(code).then(function(e){
                    history.push("/forgot-password");
                }).catch((error)=>{
                    setErrorMessage(error.code);
                    setHideCaptcha(!hideCaptcha);
                })
            }).catch(error => {
                setErrorMessage(error.code);
                setHideCaptcha(!hideCaptcha);
            })
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