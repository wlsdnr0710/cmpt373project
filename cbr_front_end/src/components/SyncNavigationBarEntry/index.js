import { useAlert } from "react-alert";
import { displayIcon } from "../../utils/Utilities";

const TRANSACTION_NAME = "requests";
const OBJECT_STORE_NAME = "queueName";


const SyncNavigationBarEntry = ({ label, iconSource, iconAlt }) => {
    const alert = useAlert();

    const getSyncUpdate = () => {
        let syncRequests = -1;

        // Default name for workbox's indexedDB background sync 
        let databaseOpenRequest = window.indexedDB.open(
            "workbox-background-sync"
        );

        databaseOpenRequest.onsuccess = () => {
            let database = databaseOpenRequest.result;
            let transaction = database.transaction([TRANSACTION_NAME], "readonly");
            let objectStore = transaction.objectStore(TRANSACTION_NAME);

            let queueIndex = objectStore.index(OBJECT_STORE_NAME);
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

        databaseOpenRequest.onerror = () => {
            throw new DOMException("Cannot open workbox indexedDB")
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
