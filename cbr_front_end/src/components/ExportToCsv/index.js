import React, { useRef } from "react";
import "./style.css";

const ExportToCsv = ({ headers, headersMapping, jsonArray }) => {
    const linkRef = useRef(null);

    const getUrl = () => {
        const csvString = convertToCsv(headers, headersMapping, jsonArray);
        const blob = convertToBlob(csvString);
        const url = URL.createObjectURL(blob);
        return url;
    };

    const convertToCsv = (headers, headersMapping, jsonArray) => {
        let csvString = "";
        csvString = addHeaders(csvString, headers);
        csvString = addData(csvString, headers, headersMapping, jsonArray);
        return csvString;
    };

    const addHeaders = (csvString, headers) => {
        for (const index in headers) {
            csvString = index !== "0" ? csvString + "," : csvString;
            csvString += headers[index];
        }
        csvString += "\r\n";
        return csvString;
    };

    const addData = (csvString, headers, headersMapping, jsonArray) => {
        for (const jsonIndex in jsonArray) {
            const jsonData = jsonArray[jsonIndex];
            for (const headerIndex in headers) {
                const headerDisplayName = headers[headerIndex];
                const headerJsonKeyName = headersMapping[headerDisplayName];
                csvString = headerIndex !== "0" ? csvString + "," : csvString;
                csvString += jsonData[headerJsonKeyName];
            }
            csvString += "\r\n";
        }
        return csvString;
    };

    const convertToBlob = (csvString) => {
        const blob = new Blob([csvString], { 
            type: 'text/csv; charset=utf-8;', 
        });
        return blob;
    };

    const onDownloadHandler = event => {
        event.preventDefault();
        linkRef.current.click();
    };

    return (
        <div className="export-to-csv">
            <a ref={linkRef} download="export.csv" href={getUrl()} style={{visibility: "hidden"}}></a>
            <button onClick={onDownloadHandler}>Export to CSV</button>
        </div>
    );
};

export default ExportToCsv;
