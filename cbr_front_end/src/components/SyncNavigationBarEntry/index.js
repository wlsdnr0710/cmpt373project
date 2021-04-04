import React, {useState} from "react";
import { useAlert } from "react-alert";
import { displayIcon } from '../../utils/Utilities';

const SyncNavigationBarEntry = ({ label, iconSource, iconAlt }) => {

    const [getNumberQueuedUpdates, setNumberQueuedUpdates] = useState();
    const alert = useAlert();

    const getSyncUpdate = () => {
        //TODO: access indexedDB to see if there are any entries to send 
        alert.info("waiting for stable internet connection to update");
    }

    return (
        <div className="navigation-entry" onClick = {getSyncUpdate}>
          {displayIcon(iconSource, iconAlt)}
          <div className="text">{label}</div>
        </div>
      );

}

export default SyncNavigationBarEntry;