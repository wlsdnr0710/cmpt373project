import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./style.css";

const ViewAnsweredSurveys = ({ survey }) => {
    const answeredQuestionsList = survey["answeredQuestions"];

    const getAnswerAndResponse = (question) => {
        const questionObject = question["question"];
        let answerText = "";

        switch (questionObject["type"]) {
            case "DROPDOWN":
                answerText = getOptionAnswerString(question["options"]);
                break;
            case "YES_OR_NO":
                answerText = getYesOrNoString(question["isTrue"]);
                break;
            case "MULTIPLE_CHOICE":
                answerText = getOptionAnswerString(question["options"]);
                break;
            case "WRITTEN":
                answerText = question["writtenAnswer"];
                break;
            default:
                answerText = "No response";
                break;
        }

        return (
            <div className="view-answered-survey">
                <div>
                    <strong>{questionObject["name"]}</strong>
                </div>
                <div>{answerText}</div>
            </div>
        );
    };

    const getOptionAnswerString = (options) => {
        return options.map((option) => option["name"]);
    };

    const getYesOrNoString = (isTrue) => {
        return isTrue ? "Yes" : "No";
    };

    return (
        <div>
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle
                            as={Button}
                            variant="link"
                            eventKey={survey.id}
                        >
                            {survey["surveyName"] + " Survey"}
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={survey.id}>
                        <Card.Body className="risk-update-card">
                            {answeredQuestionsList.map((question) =>
                                getAnswerAndResponse(question)
                            )}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
};

export default ViewAnsweredSurveys;
