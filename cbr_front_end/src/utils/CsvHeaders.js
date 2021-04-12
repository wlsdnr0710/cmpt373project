export const getClientCsvHeaders = () => {
    const headers = [
        "ID",
        "First Name",
        "Last Name",
        "Birthdate",
        "Age",
        "Gender",
        "Zone",
        "Village Number",
        "Signup Date",
        "Contact Number",
        "CBR Worker ID",
        "Caregiver Contact",
        // "Individual Goals",
        "Disabilities",
        // "Risk Histories",
    ];

    const headersMapping = {
        "ID": "id",
        "First Name": "firstName",
        "Last Name": "lastName",
        "Birthdate": "birthdate",
        "Age": "age",
        "Gender": "gender",
        "Zone": "zone",
        "Village Number": "villageNumber",
        "Signup Date": "signupDate",
        "Contact Number": "contactNumber",
        "CBR Worker ID": "cbrWorkerId",
        "Caregiver Contact": "caregiverNumber",
        // "Individual Goals": "individualGoals",
        "Disabilities": "disabilities",
        // "Risk Histories": "riskHistories",
    };

    return {
        headers: headers,
        headersMapping: headersMapping,
    };
};

export const getVisitsCsvHeader = () => {
    const headers = [
        "ID",
        "CBR Worker Name",
        "Client ID",
        "Date",
        "Purpose",
        "Health Goal Progress",
        "Health Goal Outcome",
        "Education Goal Progress",
        "Education Goal Outcome",
        "Social Goal Progress",
        "Social Goal Outcome",
        "Zone",
        "Village Number",
        "Latitude",
        "Longitude", 
    ];

    const headersMapping = {
        "ID": "id",
        "CBR Worker Name": "cbrWorkerName",
        "Client ID": "clientId",
        "Date": "date",
        "Purpose": "purpose",
        "Health Goal Progress": "healthGoalProgress",
        "Health Goal Outcome": "healthOutcome",
        "Education Goal Progress": "educationGoalProgress",
        "Education Goal Outcome": "educationOutcome",
        "Social Goal Progress": "socialGoalProgress",
        "Social Goal Outcome": "socialOutcome",
        "Zone": "zone",
        "Village Number": "villageNumber",
        "Latitude": "latitude",
        "Longitude": "longitude",
    }

    return {
        headers: headers,
        headersMapping: headersMapping,
    };
}

export const getReferralsCsvHeader = () => {
    const headers = [
        "ID",
        "Date",
        "CBR Worker Name",
        "Client Name",
        "Worker's Contact",
        "Refer To",
        "Required Service",
        "Physiotherapy",
        "Resolved",
        "Wheelchair",
        "Hip Width (inch)",
    ];

    const headersMapping = {
        "ID": "id",
        "Date": "date",
        "CBR Worker Name": "workerName",
        "Client Name": "client",
        "Worker's Contact" : "workerContact",
        "Refer To": "referTo",
        "Required Service": "requiredServiceList",
        "Physiotherapy": "physiotherapy",
        "Resolved": "resolved",
        "Wheelchair": "hasExistingWheelchair",
        "Hip Width (inch)": "hipWidthInInches",
    }

    return {
        headers: headers,
        headersMapping: headersMapping,
    };
}
