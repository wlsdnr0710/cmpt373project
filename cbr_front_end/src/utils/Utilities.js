import axios from "axios";
import ServerConfig from "../config/ServerConfig";

export const parseDateStringToEpoch = dateString => {
    return Date.parse(dateString);
};

export const parseEpochToDateString = epoch => {
    return new Date(epoch).toDateString();
};

const containsValidLabel = label => {
    if (label !== undefined) {
        return true;
    } else {
        return false;
    }
}
  
export const getLabelTag = label => {
    if (containsValidLabel(label)) {
        return (
            <div>
                <label>{label}</label>
            </div>
        );
    } else {
        return;
    }
}

export const getClientInformationFromServer = (clientId, requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/client/' + clientId, {headers: requestHeader});
};

export const getVisitsInformationFromServer = (clientId, requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/visit/clientId/' + clientId + '/sortByDate', {headers: requestHeader});
};

export const getReferralsInformationFromServer = (clientId, requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/referral/clientId/' + clientId + '/sortByDate', {headers: requestHeader});
};

export const getWorkerInformationFromServer = (username, requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/worker/username/' + username, {headers: requestHeader});
};

export const addWorkerToServer = (workerInformation) => {
    return axios.post(ServerConfig.api.url + '/api/v1/worker', {"data" : workerInformation});
};

export const getZonesFromServer = (requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/zone');
};

export const updateClientInformationToServer = (clientInformation, requestHeader) => {
    return axios.put(ServerConfig.api.url + '/api/v1/client/', {"data" : clientInformation}, {headers: requestHeader});
}

export const deleteClientFromServer = (clientId, requestHeader) => {
    return axios.delete(ServerConfig.api.url + '/api/v1/client/' + clientId, {headers: requestHeader})
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
        id: "N/A",
        type: "N/A"
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

export const getGendersObject = () =>{
    return {
        F: "F",
        M: "M",
      };
}

//TODO: get latest clientObject by id instead of array position 
export const getLatestRiskUpdate = (clientObject) => {
    const riskHistoryListLength = clientObject.riskHistories.length;
    if(riskHistoryListLength < 1){
        return getRiskObject();
    } else {
        const lastRiskUpdateIndex = riskHistoryListLength - 1;
        return clientObject.riskHistories[lastRiskUpdateIndex];
    }
}

export const getRequiredServicesKeyValues = () => {
    const requiredServicesKeyValues = {
        "physiotherapy": "1",
        "prosthetic": "2",
        "orthotic": "3",
        "wheelchair": "4",
        "other": "5",
    };
    return requiredServicesKeyValues;
};

export const getDefaultPhysiotherapyConditions = () => {
    const defaultPhysiotherapyConditions = {
        "Amputee": "1",
        "Polio": "2",
        "Spinal Cord Injury": "3",
        "Cerebral Palsy": "4",
        "Spina Bifida": "5",
        "Hydrocephalus": "6",
        "Visual Impairment": "7",
        "Hearing Impairment": "8",
        "Other": "9",
    };
    return defaultPhysiotherapyConditions;
};

export const getDefaultNewSurveyObject = () => {
    const defaultNewSurvey = {
        "name": "",
        "questions": [getDefaultSurveyQuestionObject()],
    };
    return defaultNewSurvey;
};

export const getDefaultSurveyQuestionObject = () => {
    const defaultSurveyQuestion = {
        "name": "",
        "type": "multiple_choice",
        "isRequired": false,
        "options": [getDefaultSurveyQuestionOptionObject()],
    };
    return defaultSurveyQuestion;
};

export const getDefaultSurveyQuestionOptionObject = () => {
    const surveyQuestionOption = {
        "name": "",
    };
    return surveyQuestionOption;
};

export const updateFormInputByNameAndSetter = (name, setter) => {
    return event => {
        const value = event.target.value;
        setter(prevFormInputs => {
            const newFormInputs = { ...prevFormInputs };
            newFormInputs[name] = value;
            return newFormInputs;
        });
    }
};

export const postNewSurveyQuestions = (data, requestHeader) => {
    return axios.post(ServerConfig.api.url + '/api/v1/survey', {
        "data": data
    }, {
        headers: requestHeader,
    });
};
