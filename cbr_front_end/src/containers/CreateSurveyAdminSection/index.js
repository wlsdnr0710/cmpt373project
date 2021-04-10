import React from 'react';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import "./style.css";

const CreateSurveyAdminSection = () => {
    const history = useHistory();

    const onClickCreateNewSurvey = () => {
        history.push("/new-survey");
    };

    return (
        <div className="create-new-survey-admin-section">
            <div className="title">
                Create New Survey
            </div>
            <div className="button-container">
                <Button
                    onClick={onClickCreateNewSurvey}
                    variant="primary"
                >
                    Create new survey
                </Button>
            </div>
        </div>
    );
};

export default CreateSurveyAdminSection;
