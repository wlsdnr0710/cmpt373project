import React, { useState } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import FormHeader from "../../components/FormHeader";
import NewSurveyQuestion from "../NewSurveyQuestion";
import ServerConfig from "../../config/ServerConfig";
import TextInputField from "../../components/TextInputField";
import {
    getDefaultNewSurveyObject,
    getDefaultSurveyQuestionObject,
    updateFormInputByNameAndSetter,
} from "../../utils/Utilities";
import { getToken } from "../../utils/AuthenticationUtil";
import "./style.css";

const NewSurveyForm = () => {
    const [formInputs, setFormInputs] = useState(getDefaultNewSurveyObject());

    const showSurveyQuestionInputFields = () => {
        const surveyQuestionsArray = [];
        const numQuestions = formInputs["questions"].length;
        for (let i = 0; i < numQuestions; i++) {
            const numOptions = formInputs["questions"][i]["options"].length;
            surveyQuestionsArray.push(
                <NewSurveyQuestion
                    key={i}
                    updateQuestionHandler={getUpdateQuestionHandler(i)}
                    getUpdateOptionsHandler={getUpdateOptionsHandler(i)}
                    values={formInputs["questions"][i]}
                    numOptions={numOptions}
                    onChangeQuestionType={getOnChangeQuestionTypeHandler(i)}
                    onClickMoreOption={getOnClickMoreOption(i)}
                    onChangeIsRequired={getOnChangeIsRequired(i)}
                    onDeleteHandler={getOnDeleteQuestionHandler(i)}
                />
            );
        }
        return surveyQuestionsArray;
    };

    const getUpdateQuestionHandler = questionKey => {
        return event => {
            const question = event.target;
            const value = question.value;
            setFormInputs(oldFormInputs => {
                const question = oldFormInputs["questions"][questionKey];
                question["question"] = value;
                oldFormInputs["questions"][questionKey] = question;
                return { ...oldFormInputs };
            });
        };
    };

    const getUpdateOptionsHandler = questionKey => {
        return optionKey => {
            return event => {
                const option = event.target;
                const value = option.value;
                setFormInputs(oldFormInputs => {
                    const question = oldFormInputs["questions"][questionKey]
                    const options = question["options"];
                    options[optionKey] = value;
                    oldFormInputs["questions"][questionKey]["options"] = options;
                    return { ...oldFormInputs };
                });
            };
        }
    };

    const getOnChangeQuestionTypeHandler = questionKey => {
        return event => {
            const value = event.target.value;
            setFormInputs(oldFormInputs => {
                const newFormInputs = { ...oldFormInputs };
                const newQuestionsArray = [...formInputs["questions"]];
                const newQuestion = { ...newQuestionsArray[questionKey] };
                newQuestion["question_type"] = value;
                newQuestionsArray[questionKey] = newQuestion;
                newFormInputs["questions"] = newQuestionsArray;
                return newFormInputs;
            });
        };
    };

    const getOnChangeIsRequired = questionKey => {
        return event => {
            const value = event.target.checked;
            setFormInputs(oldFormInputs => {
                const newFormInputs = { ...oldFormInputs };
                const newQuestionsArray = [...formInputs["questions"]];
                const newQuestion = { ...newQuestionsArray[questionKey] };
                newQuestion["isRequired"] = value;
                newQuestionsArray[questionKey] = newQuestion;
                newFormInputs["questions"] = newQuestionsArray;
                return newFormInputs;
            });
        };
    };

    const getOnDeleteQuestionHandler = questionKey => {
        return event => {
            if (formInputs["questions"].length === 1) {
                return;
            }
            setFormInputs(oldFormInputs => {
                const newFormInputs = { ...oldFormInputs };
                const newQuestions = [...newFormInputs["questions"]];
                newQuestions.splice(questionKey, 1);
                newFormInputs["questions"] = newQuestions;
                return newFormInputs;
            });
        };
    };

    const getOnClickMoreOption = questionKey => {
        return event => {
            event.preventDefault();
            setFormInputs(oldFormInputs => {
                // Important: Must deep copy the updating children objects/arrays
                // to avoid side effects.
                const newFormInputs = { ...oldFormInputs };
                const newQuestionArray = [...newFormInputs["questions"]];
                const newQuestion = { ...newFormInputs["questions"][questionKey] };
                const newOptions = [...newQuestion["options"]];
                newOptions.push("");
                newQuestion["options"] = newOptions;
                newQuestionArray[questionKey] = newQuestion;
                newFormInputs["questions"] = newQuestionArray;
                return newFormInputs;
            });
        };
    };

    const onClickMoreQuestion = event => {
        event.preventDefault();
        setFormInputs(oldFormInputs => {
            const newQuestions = [...oldFormInputs["questions"]];
            const newFormInputs = { ...oldFormInputs };
            newQuestions.push(getDefaultSurveyQuestionObject());
            newFormInputs["questions"] = newQuestions;
            return newFormInputs;
        });
    };

    const onSubmitHandler = event => {
        event.preventDefault();
        const requestHeader = {
            token: getToken()
        };
        axios.post(ServerConfig.api.url + '/api/v1/new_survey', {
            "data": formInputs
        }, {
            headers: requestHeader,
        })
            .then(response => {

            })
            .catch(error => {

            })
    };

    return (
        <div className="new-survey-form">
            <FormHeader
                headerText="Create new survey questions"
            />

            <div className="input-field-container">
                <div className="label-container">
                    <label>Survey Name:</label>
                </div>
                <TextInputField
                    name="name"
                    value={formInputs["name"]}
                    onChange={updateFormInputByNameAndSetter("name", setFormInputs)}
                    isDisabled={false}
                />
            </div>

            <div className="survey-question-input-fields">
                {showSurveyQuestionInputFields()}
            </div>

            <div className="more-questions-button-container">
                <Button
                    variant="info"
                    size="sm"
                    disabled={false}
                    onClick={onClickMoreQuestion}
                >
                    More Questions
                </Button>
            </div>


            <div className="submit-button-container">
                <Button
                    variant="primary"
                    size="sm"
                    disabled={false}
                    onClick={onSubmitHandler}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default NewSurveyForm;
