import axios from "axios";
import ServerConfig from "../config/ServerConfig";

export const parseISODateStringToDateString = ISODateString => {
    const MILLISECONDS_IN_MINUTE = 60000
    const localDate = new Date();
    const timezoneOffsetInMilliseconds = localDate.getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
    // We have to add the timezone offset because we aren't storing the offset in the database
    const epoch = parseDateStringToEpoch(ISODateString) + timezoneOffsetInMilliseconds;
    return parseEpochToDateString(epoch);
};

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

export const displayIcon = (iconSource, iconAlt) => {
    const entryIncludesIcon = iconSource !== undefined && iconAlt !== undefined;
    if (entryIncludesIcon) {
        return <img className="icon" src={iconSource} alt={iconAlt} />;
    }
};

export const getClientInformationFromServer = (clientId, requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/client/' + clientId, {headers: requestHeader});
};

export const getRiskInformationFromServer = (clientId, requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/riskHistory/' + clientId, {headers: requestHeader});
};

export const updateRiskInformationToServer = (riskInformation, requestHeader) => {
    return axios.put(ServerConfig.api.url + '/api/v1/riskHistory/', {"data" : riskInformation}, {headers: requestHeader});
}

export const getVisitsInformationFromServer = (clientId, requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/visit/clientId/' + clientId + '/sortByDate', {headers: requestHeader});
};

export const deleteVisitFromServer = (visitId, requestHeader) => {
    return axios.delete(ServerConfig.api.url + '/api/v1/visit/' + visitId, {headers: requestHeader})
}

export const getServiceOptions = (requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/serviceOption/', {headers: requestHeader});
}

export const postNewServiceDescription = (data, requestHeader) => {
    return axios.post(ServerConfig.api.url +  '/api/v1/serviceDescription', {
        "data": data
    }, {
        headers: requestHeader,
    });
};

export const getReferralsInformationFromServer = (clientId, requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/referral/clientId/' + clientId + '/sortByDate', {headers: requestHeader});
};

export const postNewReferrals = (data, requestHeader) => {
    return axios.post(ServerConfig.api.url + '/api/v1/referral', {
        "data": data
    }, {
        headers: requestHeader,
    });
};

export const getOutstandingReferralsFromServer = (requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/referral/outstandingReferrals', {headers: requestHeader});
};

export const getWorkerInformationFromServer = (id, requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/worker/' + id, {headers: requestHeader});
};

export const addWorkerToServer = (workerInformation) => {
    return axios.post(ServerConfig.api.url + '/api/v1/worker', {"data" : workerInformation});
};

export const addClientToServer = (clientInformation, requestHeader) => {
    return axios.post(ServerConfig.api.url + '/api/v1/client', {"data" : clientInformation}, {headers: requestHeader});
};

export const addVisitToServer = (visitInformation, requestHeader) => {
    return axios.post(ServerConfig.api.url + '/api/v1/visit', {"data" : visitInformation}, {headers: requestHeader});
};

export const addRiskToServer = (riskInformation, requestHeader) => {
    return axios.post(ServerConfig.api.url + '/api/v1/riskHistory', {"data" : riskInformation}, {headers: requestHeader});
};

export const addDisabilityToServer = (disabilityInformation, requestHeader) => {
    return axios.post(ServerConfig.api.url + '/api/v1/disabled', {"data" : disabilityInformation}, {headers: requestHeader});
};

export const getZonesFromServer = () => {
    return axios.get(ServerConfig.api.url + '/api/v1/zone');
};

export const getDisabilitiesFromServer = (requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/disability', {headers: requestHeader});
};

export const updateClientInformationToServer = (clientInformation, requestHeader) => {
    return axios.put(ServerConfig.api.url + '/api/v1/client/', {"data" : clientInformation}, {headers: requestHeader});
}

export const deleteClientFromServer = (clientId, requestHeader) => {
    return axios.delete(ServerConfig.api.url + '/api/v1/client/' + clientId, {headers: requestHeader})
}

export const getWorkerInformationFromServerById = (workerId, requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/worker/' + workerId, {headers: requestHeader});
};

export const updateWorkerInformationToServer = (workerInformation, requestHeader) => {
    return axios.put(ServerConfig.api.url + '/api/v1/worker/', {"data" : workerInformation}, {headers: requestHeader});
}

export const deleteWorkerFromServerById = (workerId, requestHeader) => {
    return axios.delete(ServerConfig.api.url + '/api/v1/worker/' + workerId, {headers: requestHeader})
}

export const getGeneralStatsByZoneCountFromServer = (requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/statistics/getGeneralStatsByZoneCount', {headers: requestHeader});
};

export const getGeneralStatsByWorkerCountFromServer = (requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/statistics/getGeneralStatsByWorkerCount', {headers: requestHeader});
};

export const getHealthRisksStatsByZoneCountFromServer = (requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/statistics/getHealthRisksStatsByZoneCount', {headers: requestHeader});
};

export const getSocialRisksStatsByZoneCountFromServer = (requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/statistics/getSocialRisksStatsByZoneCount', {headers: requestHeader});
};

export const getEducationRisksStatsByZoneCountFromServer = (requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/statistics/getEducationRisksStatsByZoneCount', {headers: requestHeader});
};

export const getDisabilitiesStatsByZoneCountFromServer = (requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/statistics/getDisabilitiesStatsByZoneCount', {headers: requestHeader});
};

export const getHealthServicesStatsByZoneCountFromServer = (requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/statistics/getHealthServicesStatsByZoneCount', {headers: requestHeader});
};

export const getSocialServicesStatsByZoneCountFromServer = (requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/statistics/getSocialServicesStatsByZoneCount', {headers: requestHeader});
};

export const getEducationServicesStatsByZoneCountFromServer = (requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/statistics/getEducationServicesStatsByZoneCount', {headers: requestHeader});
};

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
        contactNumber:"",
        cbrWorkerId:"N/A",
        caregiverName: "",
        caregiverNumber: "",
        caregiverPhoto: "image.png",
        healthGoal: "",
        socialGoal: "",
        educationGoal: "",
        disabled: [],
        riskHistories: [],
    });
}

export const getWorkerObject = () => {
    return( {
        id:"N/A",
        firstName:"N/A",
        lastName:"N/A",
        photo:"N/A",
        zone:"N/A",
        email:"N/A",
        contactNumber:"N/A",
        role:"N/A",
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

export const getWorkerRoleObject = () => {
    return {
        "Worker": "WORKER",
        "Clinician": "CLINICIAN",
        "Admin": "ADMIN",
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
        "physiotherapy": "PHYSIOTHERAPY",
        "prosthetic": "PROSTHETIC",
        "orthotic": "ORTHOTIC",
        "wheelchair": "WHEELCHAIR",
        "other": "OTHER",
    };
    return requiredServicesKeyValues;
};

export const getPhysiotherapyConditionsFromServer = (requestHeader) => {
    return axios.get(
            ServerConfig.api.url + '/api/v1/physiotherapy',
            {headers: requestHeader}
        );
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
        "type": "MULTIPLE_CHOICE",
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

export const postAnsweredSurvey = (data, requestHeader) => {
    return axios.post(ServerConfig.api.url + '/api/v1/answered_survey', {
        "data": data
    }, {
        headers: requestHeader,
    });
};

export const getAnsweredSurveysFromServer = (clientId, requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/answered_survey/client/' + clientId, {headers: requestHeader})
}

export const getAllSurveys = requestHeader => {
    return axios.get(ServerConfig.api.url + '/api/v1/survey', {headers: requestHeader});
};

export const getDefaultSurveyQuestionTypes = () => {
    const defaultSurveyQuestionTypes = {
        "Multiple Choice": "MULTIPLE_CHOICE",
        "Yes or No": "YES_OR_NO",
        "Dropdown": "DROPDOWN",
        "Written Answer": "WRITTEN",
    };
    return defaultSurveyQuestionTypes;
};

export const sortArrayByIdAscending = array => {
    const sortedArray = [...array];
    sortedArray.sort((a, b) => {
        return a["id"] > b["id"] ? 1 : -1;
    });
    return sortedArray;
};

export const getDefaultWheelchairUserTypes = () => {
    const wheelchairUserTypes = {
        "Basic": "BASIC",
        "Intermediate": "INTERMEDIATE",
    };
    return wheelchairUserTypes;
};

export const getDefaultOrthoticConditions = () => {
    const defaultOrthoticConditions = {
        "Above elbow": "ABOVE_ELBOW",
        "Below elbow": "BELOW_ELBOW",
    };
    return defaultOrthoticConditions;
};

export const getDefaultProstheticConditions = () => {
    const defaultProstheticConditions = {
        "Above knee": "ABOVE_KNEE",
        "Below knee": "BELOW_KNEE",
    };
    return defaultProstheticConditions;
};

export const getWorkerCreateAccountCode = (requestHeader) => {
    return axios.get(ServerConfig.api.url + '/api/v1/worker/createAccountCode', {headers: requestHeader});
};
