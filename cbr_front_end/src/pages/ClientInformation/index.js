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
    getClientInformationFromServer
} from "../../utils/Utilities";
import "./styles.css";

const ClientInfo = (props) => {
    const [visits, setVisits] = useState([]);
    const [referrals, setReferrals] = useState([]);
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

                    newFormInputs["name"] =
                        data.firstName + " " + data.lastName;
                    newFormInputs["id"] = data.id;
                    newFormInputs["zone"] = data.zoneName.name;
                    newFormInputs["villageNumber"] = data.villageNumber;
                    newFormInputs["gender"] = data.gender;
                    newFormInputs["age"] = data.age;
                    newFormInputs["birthdate"] = parseISODateStringToDateString(data.birthdate);
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

    const createVisitListComponents = () => {
        const visitComponents = [];
        if (visits === undefined || visits.length === 0) {
            return <p>There are no visits.</p>;
        } else {
            for (const index in visits) {
                visitComponents.push(
                    <ViewVisit visit={visits[index]} key={index} />
                );
            }
            return visitComponents;
        }
    };

    const createReferralListComponents = () => {
        const referralComponents = [];
        if (referrals === undefined || referrals.length === 0) {
            return <p>There are no referrals.</p>;
        } else {
            for (const index in referrals) {
                referralComponents.push(
                    <ViewReferrals referral={referrals[index]} key={index} />
                );
            }
            return referralComponents;
        }
    };

    const [formInputs, setFormInputs] = useState(getClientObject());

    const onClickGetNewVisitPage = () => {
        history.push({
            pathname: "/new-visit",
            state: { clientID: formInputs["id"] },
        });
    };

    const onClickGetNewReferralPage = () => {
        history.push({
            pathname: "/new-referral",
            state: { clientID: formInputs["id"] },
        });
    };

    const onClickAnswerSurveyPage = () => {
        history.push({
            pathname: "/answer-survey",
            state: { clientID: formInputs["id"] },
        });
    };

    const onClickGetEditClientPage = () => {
        history.push({
            pathname: "/edit-client",
            state: { clientID: formInputs["id"] },
        });
    };

    useEffect(() => {
        getClientDataByGetRequest();
        getVisitsDataByGetRequest();
        getReferralsDataByGetRequest();
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
                        onClick={onClickGetEditClientPage}
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
                <button type="button" className="btn btn-primary add-button">
                    Add Risk Update
                </button>
            </BackgroundCard>
            <BackgroundCard heading="Visits">
                {createVisitListComponents()}
                <button
                    type="button"
                    className="btn btn-primary add-button"
                    onClick={onClickGetNewVisitPage}
                >
                    Add Visit
                </button>
            </BackgroundCard>
            <BackgroundCard heading="Referrals">
                {createReferralListComponents()}
                <button
                    type="button"
                    className="btn btn-primary add-button"
                    onClick={onClickGetNewReferralPage}
                >
                    Add Referral
                </button>
            </BackgroundCard>
            <BackgroundCard heading="Surveys">
                {/* TODO: Add answered survey list */}
                <button
                    type="button"
                    className="btn btn-primary add-button"
                    onClick={onClickAnswerSurveyPage}
                >
                    Add Survey
                </button>
            </BackgroundCard>
        </div>
    );
};

export default ClientInfo;
