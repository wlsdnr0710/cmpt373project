import axios from "axios";
import ServerConfig from "../config/ServerConfig";

export const parseDateStringToEpoch = dateString => {
    return Date.parse(dateString);
};

export const parseEpochToDateString = epoch => {
    return new Date(epoch).toDateString();
};

//TODO: compile helper functions into this file

export const getClientInformationFromApi = (clientID) => {
    //TODO: current issue is with using Promises 
    var client;
    axios.get(ServerConfig.api.url + '/api/v1/client/' + clientID)
    .then(response =>{
        // client = getClientObjectFromResponse(response.data);
        console.log(response.data.data);
        return response.data;
    })
    .catch(error => {
        console.log("Get request failed, error: " + error)
        return null;
    });
}

const getClientObjectFromResponse = (responseData) => {
    //Loop over object and update object
    var client = getClientObject();
    console.log(client);

    Object.keys(client).forEach(function(key){
        client[key] = responseData.data[key];
    });
    return client; 
}


export const getClientObject = () => {
    return( {
        id:"N/A",
        firstName:"Adrian",
        lastName:"Wong",
        birthdate:"2018-07-13",
        age:"N/A",
        gender:"N/A",
        photo:"N/A",
        zone:"N/A",
        villageNumber:"5",
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