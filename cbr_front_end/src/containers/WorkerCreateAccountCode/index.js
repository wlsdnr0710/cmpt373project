import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { getWorkerCreateAccountCode } from "../../utils/Utilities";
import { getToken } from "../../utils/AuthenticationUtil";
import "./style.css";

const WorkerCreateAccountCode = () => {
    const [code, setCode] = useState("Click the button to generate a code.");

    const getCode = () => {
        const requestHeader = {
            token: getToken()
        };
        getWorkerCreateAccountCode(requestHeader)
        .then(response => {
            const data = response.data.data;
            const code = data["code"];
            setCode(code);
        })
        .catch(error => {
            console.log(error);
        })
    };

    return (
        <div className="worker-create-account-code">
            <div className="title">
                Worker Create Account Code
            </div>
            <div className="code-display">
                {code}
            </div>
            <div className="button-container">
                <Button
                    onClick={getCode}
                    variant="primary"
                >
                    Generate
                </Button>
            </div>
        </div>
    );
};

export default WorkerCreateAccountCode;
