import React from "react";
import BackgroundCard from "../../components/BackgroundCard";
import EditClientForm from "../../containers/EditClientForm";
import "./style.css";

const EditClient = (props) => {
  return (
    <div>
      <BackgroundCard heading="Edit Client">
        <EditClientForm clientID={props.location.state.clientID}/>
      </BackgroundCard>
    </div>
  );
};

export default EditClient;
