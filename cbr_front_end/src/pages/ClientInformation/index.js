import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getToken, doAuthentication } from "../../utils/AuthenticationUtil";
import defaultPhoto from "../../assets/avatar.png";
import ClientInformation from "../../components/ClientInformation";
import ViewVisit from "../../components/ViewVisit";
import ViewReferrals from "../../components/ViewReferrals";
import BackgroundCard from "../../components/BackgroundCard";
import RiskInformation from "../../containers/RiskInformation";
import DisabilityInformation from "../../components/DisabilityInformation";
import qs from "query-string";
import {
    parseISODateStringToDateString,
    getClientObject,
    getVisitsInformationFromServer,
    getReferralsInformationFromServer,
    getClientInformationFromServer,
    getAnsweredSurveysFromServer,
} from "../../utils/Utilities";
import "./styles.css";

const ClientInfo = (props) => {
    const [formInputs, setFormInputs] = useState(getClientObject());
    const [visits, setVisits] = useState([]);
    const [referrals, setReferrals] = useState([]);
    const [answeredSurveys, setAnsweredSurveys] = useState([]);
    const history = useHistory();
    doAuthentication(history);

    const requestHeader = {
        token: getToken(),
    };

    const parameterString = props.location.search;
    const clientId = qs.parse(parameterString).id;

    const getClientDataByGetRequest = useCallback(() => {
        getClientInformationFromServer(clientId, requestHeader)
            .then((response) => {
                var JSONData = response.data;
                setFormInputs((prevFormInputs) => {
                    const data = JSONData.data;
                    const newFormInputs = { ...prevFormInputs };

                    if (data.photo) {
                        newFormInputs["photo"] = data.photo;
                    } else {
                        newFormInputs["photo"] = defaultPhoto;
                    }

                    newFormInputs["name"] = data.firstName + " " + data.lastName;
                    newFormInputs["id"] = data.id;
                    newFormInputs["zone"] = data.zoneName.name;
                    newFormInputs["villageNumber"] = data.villageNumber;
                    newFormInputs["gender"] = data.gender;
                    newFormInputs["age"] = data.age;
                    newFormInputs["birthdate"] = parseISODateStringToDateString(data.birthdate);
                    newFormInputs["contactNumber"] = data.contactNumber;
                    newFormInputs["caregiverName"] = data.caregiverName;
                    newFormInputs["caregiverNumber"] = data.caregiverNumber;
                    newFormInputs["date"] = parseISODateStringToDateString(data.signupDate);
                    newFormInputs["riskHistories"] = data.riskHistories;
                    newFormInputs["disabled"] = data.disabled;
                    return newFormInputs;
                });
            })
            .catch((error) => {
                throw new DOMException("Error could not fetch client information: " + error);
            });
    }, [clientId]);

    const getVisitsDataByGetRequest = () => {
        getVisitsInformationFromServer(clientId, requestHeader).then(
            (response) => {
                setVisits(response.data.data);
            }
        );
    };

    const getReferralsDataByGetRequest = () => {
        getReferralsInformationFromServer(clientId, requestHeader).then(
            (response) => {
                setReferrals(response.data.data);
            }
        );
    };

    const getAnsweredSurveysByGetRequest = () => {
        getAnsweredSurveysFromServer(clientId, requestHeader).then(
            (response) => {
                setAnsweredSurveys(response.data.data);
            }
        )
    }

    const getVisitComponent = (visit) => {
        return <ViewVisit visit={visit} key={visit["id"]} />
    }

    const createVisitListComponents = () => {
        const visitsIsEmpty = visits === undefined || visits.length === 0;
        if (visitsIsEmpty) {
            return <p>There are no visits.</p>;
        } else {
            return visits.map((visit) => {
                return getVisitComponent(visit);
            })
        }
    };

    const getReferralComponent = (referral) => {
        return <ViewReferrals referral={referral} key={referral["id"]} />
    }

    const createReferralListComponents = () => {
        const referralsIsEmpty = (referrals === undefined || referrals.length === 0);
        if (referralsIsEmpty) {
            return <p>There are no referrals.</p>;
        } else {
            return referrals.map((referral) => {
                return getReferralComponent(referral);
            });
        }
    };

    const getSurveyComponent = (survey) => {
        return
    }

    const createAnsweredSurveysListComponents = () => {
        const answeredSurveysIsEmpty = answeredSurveys === undefined || answeredSurveys.length === 0;
        if (answeredSurveysIsEmpty) {
            return <p>There are no answered surveys.</p>;
        } else {
            return answeredSurveys.map( survey => {
                return getSurveyComponent(survey);
            })
        }

    }

    const onClickPushPageWithId = (pathName) => {
        history.push({
            pathname: pathName,
            state: { clientID: formInputs["id"] }
        })
    }

    useEffect(() => {
        getClientDataByGetRequest();
        getVisitsDataByGetRequest();
        getReferralsDataByGetRequest();
        getAnsweredSurveysByGetRequest();
    }, [getClientDataByGetRequest]);

    return (
        <div className="client-information">
            <BackgroundCard>
                <ClientInformation clientObject={formInputs} />
                <hr />
                <h3>Disability and Ailment(s)</h3>
                <DisabilityInformation disabilityList={formInputs.disabled} />
                <div>
                    <button
                        type="button"
                        className="btn btn-primary add-button"
                        onClick={() => onClickPushPageWithId("edit-client")}
                    >
                        Edit Client
                    </button>
                </div>
            </BackgroundCard>
            <BackgroundCard heading="Risk History">
                <RiskInformation
                    className="client-risk-information"
                    riskHistories={formInputs.riskHistories}
                />
                <button
                    type="button"
                    className="btn btn-primary add-button"
                    onClick={() => onClickPushPageWithId("new-risk-update")}
                >
                    Add Risk Update
                </button>
            </BackgroundCard>
            <BackgroundCard heading="Visits">
                {createVisitListComponents()}
                <button
                    type="button"
                    className="btn btn-primary add-button"
                    onClick={() => onClickPushPageWithId("new-visit")}
                >
                    Add Visit
                </button>
            </BackgroundCard>
            <BackgroundCard heading="Referrals">
                {createReferralListComponents()}
                <button
                    type="button"
                    className="btn btn-primary add-button"
                    onClick={() => onClickPushPageWithId("new-referral")}
                >
                    Add Referral
                </button>
            </BackgroundCard>
            <BackgroundCard heading="Surveys">
                {/* {createAnsweredSurveysListComponents()} */}
                <button
                    type="button"
                    className="btn btn-primary add-button"
                    onClick={() => onClickPushPageWithId("answer-survey")}
                >
                    Add Survey
                </button>
            </BackgroundCard>
        </div>
    );
};

export default ClientInfo;
