import axios from "axios";
import ServerConfig from "../config/ServerConfig";

export const parseDateStringToEpoch = dateString => {
    return Date.parse(dateString);
};

export const parseEpochToDateString = epoch => {
    return new Date(epoch).toDateString();
};

//TODO: compile helper functions into this file

export const getClientInformationFromApi = (clientId) => {
    return axios.get(ServerConfig.api.url + '/api/v1/client/' + clientId);
};

const getClientObjectFromResponse = (responseData) => {
    //Loop over object and update object
    const client = getClientObject();

    Object.keys(client).forEach(function(key){
        client[key] = responseData.data[key];
    });
    return client; 
}

export const getClientObject = () => {
    return( {
        id:"N/A",
        firstName:"N/A",
        lastName:"N/A",
        birthdate:"N/A",
        age:"N/A",
        gender:"N/A",
        photo:"N/A",
        zone:"N/A",
        villageNumber:"N/A",
        signupDate:"N/A",
        contactNumber:"N/A",
        cbrWorkerId:"N/A",
        caregiverContact: "N/A",
        caregiverPhoto: "image.png",
        requiredServices: "N/A",
        individualGoals: "N/A",
        disabilities: [],
        riskHistories: [],
    });
}

export const getRiskObject = () => {
    return ({
        id: "N/A",
        createdDate: "N/A",
        educationGoal: "N/A",
        educationRisk: "N/A",
        educationRiskDescription: "N/A",
        healthGoal: "N/A",
        healthRisk: "N/A",
        healthRiskDescription: "N/A",
        socialGoal: "N/A",
        socialRisk: "N/A",
        socialRiskDescription: "N/A"
    })
}

export const getDisabilityObject = () => {
    return {
        id: 1,
        type: "Amputee"
    }
}

export const getClientZonesObject = () => {
    return {
        "BidiBidi Zone 1": "1",
        "BidiBidi Zone 2": "2",
        "BidiBidi Zone 3": "3",
        "BidiBidi Zone 4": "4",
        "BidiBidi Zone 5": "5",
        "Palorinya Basecamp": "6",
        "Palorinya Zone 1": "7",
        "Palorinya Zone 2": "8",
        "Palorinya Zone 3": "9",
      };
}
//TODO: get latest clientObject by id? instead of array position 
export const getLatestRiskUpdate = (clientObject) => {
    const riskHistoryListLength = clientObject.riskHistories.length;
    if(riskHistoryListLength < 1){
      return getRiskObject();
    } else {
      const lastRiskUpdateIndex = riskHistoryListLength - 1;
      return clientObject.riskHistories[lastRiskUpdateIndex];
    }
  }
  