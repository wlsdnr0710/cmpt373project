import React, { useEffect, useState } from 'react';
import { getToken } from "../../utils/AuthenticationUtil";
import { parseDateStringToEpoch, parseEpochToDateString } from "../../utils/Utilities";
import axios from 'axios';
import AlertMessage from '../../components/AlertMessage';
import ServerConfig from "../../config/ServerConfig";
import TextAreaInputField from "../../components/TextAreaInputField";
import DropdownList from "../../components/DropdownList";
import Button from 'react-bootstrap/Button';
import './style.css';

const AlertMessageBoard = () => {
    const [alertMessages, setAlertMessages] = useState({});
    const [newMessage, setNewMessage] = useState("");

    const variants = ["primary", "warning", "danger"];

    const defaultSortBy = "date";
    const [sortBy, setSortBy] = useState(defaultSortBy);
    const defaultPriority = 1;
    const [priority, setPriority] = useState(defaultPriority);

    const getSortByList = () => {
        return {
            "Date": defaultSortBy,
            "Priority": "priority",
        };
    };

    const getPriorityList = () => {
        return {
            "Low": defaultPriority,
            "Medium": 2,
            "High": 3,
        };
    };

    const getAllAlertMessages = () => {
        const requestHeader = {
            token: getToken()
        };

        axios.get(
                ServerConfig.api.url + "/api/v1/message/sortBy/" + sortBy,
                {
                    headers: requestHeader,
                }
            )
            .then(response => {
            let list = new Array();
            for(var i = 0; i < response.data.data.length; i++) {
                const eachPriority = variants[response.data.data[i].priority-1]
                list[i] = {
                    "variant": eachPriority,
                    "message": response.data.data[i].message,
                    "date": parseEpochToDateString(response.data.data[i].date),
                };
            }
            setAlertMessages(list);
            });
    };

    const addNewAlertMessage = () => {
        const requestHeader = {
            token: getToken()
        };

        const data = { "workerId": 1, "message": newMessage, "priority": priority, "date": "2021-03-13"
        }

        axios.post(ServerConfig.api.url + '/api/v1/message', {
            "data": data
        }, {
            headers: requestHeader,
        })
        .catch(error => {
                       console.log(error.response.data);
                    })
    }


    const parseISODateString = ISODateString => {
        const epoch = parseDateStringToEpoch(ISODateString);
        return parseEpochToDateString(epoch);
    };

    useEffect(() => {
        getAllAlertMessages();
    }, []);

    const createMessageComponents = () => {
        const alertMessageComponents = [];
        if (!alertMessages) {
            return (<AlertMessage message={"There is no alert now"} />)
        }
        else {
            for (const index in alertMessages) {
                const message = alertMessages[index].message;
                const variant = alertMessages[index].variant;
                const date = alertMessages[index].date;
                alertMessageComponents.push(<AlertMessage message={message} variant={variant} date={date} key={index}/>)
            }
            return alertMessageComponents;
        }
    };

    const onChangeSortByHandler = event => {
        const sortByDropdown = event.target;
        const sortByValue = sortByDropdown.value;
        setSortBy(sortByValue);
    };

    const onChangePriorityHandler = event => {
        const priorityDropdown = event.target;
        const priorityValue = priorityDropdown.value;
        setPriority(priorityValue);
    };

    const messageFormInputChangeHandler = event => {
        const input = event.target;
        const value = input.value;
        setNewMessage(value);
    }

    return (
        <div className="alert-board">
            <div className="alert-board-title">Alert Messages</div> 
            <div className="messages">
                {createMessageComponents()}
            </div>
            <span> Sort By: </span>
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            <Button onClick={getAllAlertMessages} variant="primary">Refresh</Button>
            &nbsp;
            <Button variant="primary">Add</Button>
            <div className="sort-dropdown">
                <DropdownList
                    dropdownName="sort-by"
                    dropdownListItemsKeyValue={getSortByList()}
                    value={sortBy}
                    onChange={onChangeSortByHandler}
                />
            </div>
            <div className="add">
            <TextAreaInputField
                name="message"
                value={newMessage}
                onChange={messageFormInputChangeHandler}
                disabled={false}
            />
            <span>Priority</span>
            <DropdownList
                dropdownName="priority"
                dropdownListItemsKeyValue={getPriorityList()}
                value={priority}
                onChange={onChangePriorityHandler}
            />
            <div className="submit">
                <Button onClick={addNewAlertMessage} variant="primary">Submit</Button>
            </div>
            </div>
        </div>
    );
};

export default AlertMessageBoard;
