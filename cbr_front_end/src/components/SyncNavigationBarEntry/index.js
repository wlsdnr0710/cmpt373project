import { useAlert } from "react-alert";
import { displayIcon } from "../../utils/Utilities";

const TRANSACTION_NAME = "requests";
const OBJECT_STORE_NAME = "queueName";

const SyncNavigationBarEntry = ({ label, iconSource, iconAlt }) => {
    const alert = useAlert();

    const onClickSyncUpdateHandler = () => {
        let syncRequests = -1;

        // Default name for workbox's indexedDB background sync
        let databaseOpenRequest = window.indexedDB.open(
            "workbox-background-sync"
        );

        databaseOpenRequest.onsuccess = () => {
            try {
                let database = databaseOpenRequest.result;
                let transaction = database.transaction(
                    [TRANSACTION_NAME],
                    "readonly"
                );
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
            } catch {
                // Access error means workbox has not initalized background sync indexedDB
                // meaning nothing has been previously synced / needs to be synced
                alert.info("Nothing to sync");
            }
        };

        databaseOpenRequest.onerror = () => {
            throw new DOMException("Cannot open workbox indexedDB");
        };
    };

    return (
        <div className="navigation-entry" onClick={onClickSyncUpdateHandler}>
            {displayIcon(iconSource, iconAlt)}
            <div className="text">{label}</div>
        </div>
    );
};

export default SyncNavigationBarEntry;
