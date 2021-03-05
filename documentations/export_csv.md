# Export CSV Component

There is a component called ExportToCsv that can convert JSON data to CSV format and allow users to download the CSV file.

## Usage

To use the component, import the component and place it at the position where you want to display the export button. For example,

```js
<ExportToCsv 
    filename="client_data"
    headers={getClientCsvHeaders().headers}
    headersMapping={getClientCsvHeaders().headersMapping}
    jsonArray={getAndCleanClientsJsonArray(clients)}
/>
```

## Component Props

### filename

The filename prop is the name of the CSV file. The extension .csv is automatically included so do not type .csv in the filename props again.

### headers

We need to tell the component the headers of the CSV file. For example,

```js
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
```

## headersMapping

We need to mapping between headers and the corresponding key values in the JSON data. For example,

```js
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
```

## jsonArray

We need to pass an array of JSON data to the component. Each JSON data element in the array will be one row in the CSV file. For example,

```js
const jsonArray = [{...}, {...}, {...}, ...];
```
