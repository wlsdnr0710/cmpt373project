import React from "react";
import { doAuthentication, checkForAdmin } from "../../utils/AuthenticationUtil";
import BackgroundCard from "../../components/BackgroundCard";
import EditWorkerForm from "../../containers/EditWorkerForm";
import "./style.css";

const EditWorker = ({ history, location }) => {
  doAuthentication(history);
  checkForAdmin(history);
  
  return (
    <div>
      <BackgroundCard heading="Edit Worker">
        <EditWorkerForm workerID={location.state.workerID}/>
      </BackgroundCard>
    </div>
  );
};

export default EditWorker;
