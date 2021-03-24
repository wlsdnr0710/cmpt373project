import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import FormHeader from "../../components/FormHeader";
import NewSurveyQuestion from "../NewSurveyQuestion";
import Spinner from 'react-bootstrap/Spinner';
import TextInputField from "../../components/TextInputField";
import {
    getDefaultNewSurveyObject,
    getDefaultSurveyQuestionObject,
    getDefaultSurveyQuestionOptionObject,
    postNewSurveyQuestions,
    updateFormInputByNameAndSetter,
} from "../../utils/Utilities";
import { getToken } from "../../utils/AuthenticationUtil";
import "./style.css";

const NewSurveyForm = () => {
    const [formInputs, setFormInputs] = useState(getDefaultNewSurveyObject());
    const [isFormDisabled, setIsFormDisabled] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

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
                    onDeleteQuestionHandler={getOnDeleteQuestionHandler(i)}
                    getOnDeleteOptionHandler={getOnDeleteOptionHandler(i)}
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
                question["name"] = value;
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
                    options[optionKey]["name"] = value;
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
                newQuestion["questionType"] = value;
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

    const getOnDeleteOptionHandler = questionKey => {
        return optionKey => {
            return event => {
                if (formInputs["questions"][questionKey]["options"].length === 1) {
                    return;
                }
                setFormInputs(oldFormInputs => {
                    const newFormInputs = { ...oldFormInputs };
                    const newQuestionArray = [...newFormInputs["questions"]];
                    const newQuestion = { ...newFormInputs["questions"][questionKey] };
                    const newOptions = [...newQuestion["options"]];
                    newOptions.splice(optionKey, 1);
                    newQuestion["options"] = newOptions;
                    newQuestionArray[questionKey] = newQuestion;
                    newFormInputs["questions"] = newQuestionArray;
                    return newFormInputs;
                });
            };
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
                newOptions.push(getDefaultSurveyQuestionOptionObject());
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
        setStatesDuringSubmitting();
        const requestHeader = {
            token: getToken()
        };
        postNewSurveyQuestions(formInputs, requestHeader)
            .then(response => {
                setStatesWhenSuccess();
                // TODO: When view survey page is done,
                // redirect users to the newly created survey page.
            })
            .catch(error => {
                setStatesWhenFail();
                updateErrorMessages(error);
            })
    };

    const setStatesDuringSubmitting = () => {
        setIsSuccess(false);
        setErrorMessages([]);
        setIsFormDisabled(true);
        setIsSubmitting(true);
    };

    const setStatesWhenSuccess = () => {
        setIsSuccess(true);
        setIsFormDisabled(false);
        setIsSubmitting(false);
    };

    const setStatesWhenFail = () => {
        setIsFormDisabled(false);
        setIsSubmitting(false);
    };

    const updateErrorMessages = error => {
        setErrorMessages(prevErrorMessages => {
            let messages = ["Something went wrong on the server."];
            if (error.response) {
                messages = error.response.data.messages;
            }
            const newMessages = [...prevErrorMessages, ...messages];
            return newMessages;
        });
    };

    const showSuccessMessage = () => {
        if (!isSuccess) {
            return null;
        }
        return (
            <Alert variant="success">
                The survey is successfully submitted!
            </Alert>
        );
    };

    const showErrorMessages = () => {
        if (hasErrorMessages()) {
            const msgInDivs = packMessagesInDivs(errorMessages);
            return (
                <Alert variant="danger">
                    {msgInDivs}
                </Alert>
            );
        } else {
            return null;
        }
    };

    const hasErrorMessages = () => {
        return errorMessages.length !== 0;
    };

    const packMessagesInDivs = messages => {
        const msgInDivs = [];
        for (const idx in messages) {
            const msg = messages[idx];
            msgInDivs.push(
                <div key={idx}>
                    {msg}
                </div>
            );
        }
        return msgInDivs;
    };

    const getSubmitButtonText = () => {
        if (isSubmitting) {
            return (
                <div className="spinning-submit-button-text">
                    <Spinner
                        className="spinner"
                        as="div"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Submitting
                </div>
            );
        } else {
            return "Submit";
        }
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
                    disabled={isFormDisabled}
                    onClick={onSubmitHandler}
                >
                    {getSubmitButtonText()}
                </Button>
            </div>
            <div className="feedback-messages">
                {showSuccessMessage()}
                {showErrorMessages()}
            </div>
        </div>
    );
};

export default NewSurveyForm;
