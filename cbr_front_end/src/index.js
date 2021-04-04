import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from 'react-alert-template-basic'
import { getAlertOptionsObject } from "./utils/backgroundSync"

//TODO: Change tempalte options here 
ReactDOM.render(
    <AlertProvider template={AlertTemplate} {...getAlertOptionsObject}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </AlertProvider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
