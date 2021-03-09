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
        "CBR Worker Id",
        "Caregiver Contact",
        "Required Services",
        "Individual Goals",
        "Disabilities",
        "Risk Histories",
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
        "CBR Worker Id": "cbrWorkerId",
        "Caregiver Contact": "caregiverContact",
        "Required Services": "requiredServices",
        "Individual Goals": "individualGoals",
        "Disabilities": "disabilities",
        "Risk Histories": "riskHistories",
    };

    return {
        headers: headers,
        headersMapping: headersMapping,
    };
};
