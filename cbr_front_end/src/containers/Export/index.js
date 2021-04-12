import axios from "axios";
import React, { useState, useEffect } from "react";
import ExportToCsv from "../../components/ExportToCsv";
import ServerConfig from "../../config/ServerConfig";
import { getToken } from "../../utils/AuthenticationUtil";
import { getClientCsvHeaders, getVisitsCsvHeader, getReferralsCsvHeader } from "../../utils/CsvHeaders";
import { parseISODateStringToDateString } from "../../utils/Utilities";
import "./style.css"


const Export = () => {
    const [clientsJsonArray, setClientsJsonArray] = useState([]);
    const [visitsJsonArray, setVisitsJsonArray] = useState([]);
    const [referralsJsonArray, setreferralsJsonArray] = useState([]);

    useEffect(()=> {
        const requestHeader = {
            token: getToken()
        };

        axios.get(
            ServerConfig.api.url + '/api/v1/client',
                {
                    headers: requestHeader,
                }
        )
        .then(response => {
            const clients = response.data.data;
            const cleanClientJsonArray = [];
            for (const index in clients) {
                const clientJson = clients[index];
                const cleanClientJson = {...clientJson};
                cleanClientJson["zone"] = cleanClientJson["zoneName"]["name"];
                cleanClientJson["birthdate"] = formatDateString(cleanClientJson["birthdate"]);
                cleanClientJson["signupDate"] = formatDateString(cleanClientJson["signupDate"]);
                cleanClientJson["disabilities"] = "";
                for (const disabilityIndex in cleanClientJson["disabled"]) {
                    let disability = cleanClientJson["disabled"][disabilityIndex]["disability"]["type"];
                    if (disability === "Other")
                        disability = cleanClientJson["disabled"]["otherDescription"];
                    disability += " ";
                    cleanClientJson["disabilities"] += disability;
                }
                cleanClientJsonArray.push(cleanClientJson);
            }
            setClientsJsonArray(cleanClientJsonArray);
        })
        .catch(error => {
            
        })

        axios.get(
            ServerConfig.api.url + '/api/v1/visit',
                {
                    headers: requestHeader,
                }
        ).then(response => {
            const visits = response.data.data;
            const cleanVisitJsonArray = [];
            for (const index in visits) {
                const visitJson = visits[index];
                const cleanVisitJson = {...visitJson};
                cleanVisitJson["zone"] = cleanVisitJson["zoneName"]["name"];
                cleanVisitJson["date"] = formatDateString(cleanVisitJson["date"]);
                cleanVisitJsonArray.push(cleanVisitJson);
            }
            setVisitsJsonArray(cleanVisitJsonArray);
        }).catch(error => {

        });


        axios.get(
            ServerConfig.api.url + '/api/v1/referral',
                {
                    headers: requestHeader,
                }
        ).then(response => {
            const referrals = response.data.data;
            const cleanReferralJsonArray = [];
            for (const index in referrals) {
                const referralJson = referrals[index];
                const cleanReferralJson = {...referralJson};
                cleanReferralJson["date"] = formatDateString(cleanReferralJson["date"]);
                cleanReferralJson["workerName"] = cleanReferralJson["worker"]["firstName"] + " " + cleanReferralJson["worker"]["lastName"];
                cleanReferralJson["client"] = cleanReferralJson["client"]["firstName"] + " " + cleanReferralJson["client"]["lastName"];
                cleanReferralJson["workerContact"] = cleanReferralJson["worker"]["phone"];
                cleanReferralJson["requiredServiceList"] = ""
                if(cleanReferralJson["requiredServices"]["orthotic"])   
                    cleanReferralJson["requiredServiceList"] += "orthotic ";
                if(cleanReferralJson["requiredServices"]["physiotherapy"])   
                    cleanReferralJson["requiredServiceList"] += "physiotherapy ";
                if(cleanReferralJson["requiredServices"]["prothetic"])   
                    cleanReferralJson["requiredServiceList"] += "prothetic ";
                if(cleanReferralJson["requiredServices"]["wheelchair"])   
                    cleanReferralJson["requiredServiceList"] += "wheelchair ";
                if(cleanReferralJson["requiredServices"]["other"])   
                    cleanReferralJson["requiredServiceList"] += cleanReferralJson["requiredServices"]["otherDescription"];
                cleanReferralJson["physiotherapy"] = cleanReferralJson["physiotherapy"]["type"];
                cleanReferralJsonArray.push(cleanReferralJson);
            }
            setreferralsJsonArray(cleanReferralJsonArray);
        }).catch(error => {
            
        });

    }, [])
    const formatDateString = date => {
        const dateString = parseISODateStringToDateString(date);
        return dateString;
    };

    return (
        <div className="export">
            <div className="export-title">
                Export Data
            </div>
            <div className="export-table">
                <h5>Clients Data:</h5>
                <ExportToCsv 
                    filename="client_data"
                    headers={getClientCsvHeaders().headers}
                    headersMapping={getClientCsvHeaders().headersMapping}
                    jsonArray={clientsJsonArray}
                />
                <h5>Visits Data:</h5>
                <ExportToCsv 
                    filename="visit_data"
                    headers={getVisitsCsvHeader().headers}
                    headersMapping={getVisitsCsvHeader().headersMapping}
                    jsonArray={visitsJsonArray}
                />
                <h5>Referrals Data:</h5>
                <ExportToCsv 
                    filename="referral_data"
                    headers={getReferralsCsvHeader().headers}
                    headersMapping={getReferralsCsvHeader().headersMapping}
                    jsonArray={referralsJsonArray}
                />
            </div>
        </div>
    )
}

export default Export;
