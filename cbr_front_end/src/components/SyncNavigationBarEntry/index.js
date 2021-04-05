import { useAlert } from "react-alert";
import { displayIcon } from "../../utils/Utilities";

const SyncNavigationBarEntry = ({ label, iconSource, iconAlt }) => {
    const alert = useAlert();

    const getSyncUpdate = () => {
        //TODO: access indexedDB to see if there are any entries to send
        let syncRequests = -1;

        let dataBaseOpenRequest = window.indexedDB.open(
            "workbox-background-sync"
        );
        dataBaseOpenRequest.onsuccess = () => {
            let dataBase = dataBaseOpenRequest.result;
            let transaction = dataBase.transaction(["requests"], "readonly");
            let objectStore = transaction.objectStore("requests");

            let queueIndex = objectStore.index("queueName");
            let syncCountRequest = queueIndex.count();

            syncCountRequest.onsuccess = () => {
                syncRequests = syncCountRequest.result;
                if (syncRequests < 0) {
                    alert.error("Error cannot sync");
                } else if (syncRequests === 0) {
                    alert.success("All up to date");
                } else if (syncRequests > 0) {
                    alert.info("Waiting for stable internet connection");
                }
            };
        };

        dataBaseOpenRequest.onerror = () => {
            //throw error
        };
    };

    return (
        <div className="navigation-entry" onClick={getSyncUpdate}>
            {displayIcon(iconSource, iconAlt)}
            <div className="text">{label}</div>
        </div>
    );
};

export default SyncNavigationBarEntry;
