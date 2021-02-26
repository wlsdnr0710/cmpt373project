import axios from "axios";
import ServerConfig from "../config/ServerConfig";

export const parseDateStringToEpoch = dateString => {
    return Date.parse(dateString);
};

export const parseEpochToDateString = epoch => {
    return new Date(epoch).toDateString();
};

//TODO: compile helper functions into this file

export const getClientInformationFromAPI = (clientID) => {
    let client = getClientObject;
    axios.get(ServerConfig.api.url + '/api/v1/client/' + clientID)
    .then(response =>{
        client = updateClientObjectFromResponse(response, client);
    })
    .catch(error => {
        console.log("Get request failed, error: " + error)
    });
    return client;
}

const updateClientObjectFromResponse = (response, client) => {
    const JSONResponse = response.data;

    //Loop over object and update object 
    for (const [key, value] of Object.entries(JSONResponse)){
        client[key] = response[key];
    }
}


const getClientObject = () => {
    return( {
        id:"N/A",
        firstName:"Adrian",
        lastName:"Wong",
        birthdate:"2018-07-13",
        age:"N/A",
        gender:"N/A",
        photo:"N/A",
        zone:"N/A",
        villageNumber:"N/A",
        signupDate:"N/A",
        contactNumber:"N/A",
        cbrWorkerId:"N/A",
        caregiverPhoto: "image.png",
        requiredServices: "N/A",
        individualGoals: "N/A",
        disabilities: [],
        riskHistories: [],
    });
}