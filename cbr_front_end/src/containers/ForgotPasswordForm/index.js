import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import Logo from "../../assets/HHALogo.svg";
import NumberInputField from "../../components/NumberInputField"
import "./style.css";

const ForgotPasswordForm = () => {
    const history = useHistory();
    const [contactNumber, setContactNumber] = useState()

    const contactNumberHandler = event => {
        const input = event.target;
        const value = input.value;
        setContactNumber(value);
    }

    const onClickSubmit = () =>{
        history.push(history.push("/OTP-verification?query=" + contactNumber));
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
                <div>
                    <button className="submit-button" onClick={onClickSubmit}>
                        Submit
                    </button>
                </div>
                <div className="margin-padding"/>
            </div>
        </div>
        
    );

}


export default ForgotPasswordForm;