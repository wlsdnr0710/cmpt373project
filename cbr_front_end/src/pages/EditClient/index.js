import React from "react";
import BackgroundCard from "../../components/BackgroundCard";
import EditClientForm from "../../containers/EditClientForm";
import "./style.css";


const EditClient = () => {
  return (
    <div>
      <BackgroundCard heading="Edit Client">
        <EditClientForm />
      </BackgroundCard>
    </div>
  );
};

export default EditClient;
