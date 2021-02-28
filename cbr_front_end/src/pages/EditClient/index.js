import React from "react";
import { doAuthentication } from "../../utils/AuthenticationUtil";
import BackgroundCard from "../../components/BackgroundCard";
import EditClientForm from "../../containers/EditClientForm";
import "./style.css";

const EditClient = ({ history }) => {
  doAuthentication(history);
  return (
    <div>
      <BackgroundCard heading="Edit Client">
        <EditClientForm />
      </BackgroundCard>
    </div>
  );
};

export default EditClient;
