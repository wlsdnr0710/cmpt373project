import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextInputField from "../../components/TextInputField";
import DropdownList from "../../components/DropdownList";
import avatar from "../../assets/avatar.png";
import PhoneInputField from "../../components/PhoneInputField";
import ImageInputField from "../../components/ImageInputField";
import { getToken } from "../../utils/AuthenticationUtil";
import {
	deleteWorkerFromServerById,
	getWorkerInformationFromServerById,
	getWorkerObject,
	updateWorkerInformationToServer,
	getClientZonesObject,
	getWorkerRoleObject,
} from "../../utils/Utilities";
import "./style.css";

//TODO: Grab dropdown options from database table
const defaultZones = getClientZonesObject();
const defaultWorkerRoles = getWorkerRoleObject();

const EditWorkerForm = (props) => {
	const workerId = props.workerID;
	const history = useHistory();

	const [workerInformation, setWorkerInformation] = useState(getWorkerObject());
	const [originalWorkerInformation, setOriginalWorkerInformation] = useState(
		getWorkerObject()
	);

	const discardChanges = () => {
		setWorkerInformation(originalWorkerInformation);
	};

	const getWorkerInformation = useCallback(() => {
		const requestHeader = {
			token: getToken(),
		};
		getWorkerInformationFromServerById(workerId, requestHeader)
		.then((response) => {
			setWorkerInformation(response.data.data);
			setOriginalWorkerInformation(response.data.data);
		})
		.catch((error) => {
			console.log("ERROR: Get request failed. " + error);
		});
	}, [workerId]);

	useEffect(() => {
		getWorkerInformation();
	}, [getWorkerInformation]);

	const handleChange = (event) => {
		const input = event.target;
		const name = input.name;
		const value = input.value;
		updateWorkerInformation(name, value);
	};

	const saveChangesAndPushWorkerInformationPage = event => {
		event.preventDefault();
		const requestHeader = {
			token: getToken(),
		};
		updateWorkerInformationToServer(workerInformation, requestHeader)
		.then((response) => {
			history.push("/worker-information?id=" + workerInformation["id"]);
		})
		.catch((error) => {
			console.log("ERROR: Put request failed." + error);
		});
	};

	const updateWorkerInformation = (name, value) => {
		setWorkerInformation((prevFormInputs) => {
			const newFormInputs = { ...prevFormInputs };
			newFormInputs[name] = value;
			return newFormInputs;
		});
	};

	const deleteWorkerAndPushAllWorkerPage = () => {
		const requestHeader = {
			token: getToken(),
		};
		deleteWorkerFromServerById(workerId, requestHeader)
		.then((response) => {
			history.push("/admin");
		})
		.catch((error) => {
			console.log("ERROR: Delete request failed. " + error);
		});
	};

	const [showImageUploader, setImageUploader] = useState(false);

	const toggleImageUpload = () => {
		setImageUploader(!showImageUploader);
	};

	//TODO: Add a photo field for the worker in the table
	const getImageUploadOnState = (showImageUploader) => {
		if (showImageUploader) {
			return (
				<ImageInputField
					id="worker-photo-input"
					primaryText="Select a photo for WORKER"
					secondaryText="PNG, jpg, gif files up to 10 MB in size"
				/>
			);
		} else {
			return null;
		}
	};

	return (
		<form className="edit-worker-form">
			<div>
				<div className="worker-image" onClick={toggleImageUpload}>
				<img src={avatar} alt="worker"></img>
				<div className="upload-banner">Upload Photo</div>
				</div>
				{getImageUploadOnState(showImageUploader)}
			</div>

			<div className="input-field">
				<DropdownList
					dropdownListItemsKeyValue={defaultZones}
					dropdownName="zone"
					value={workerInformation.zone}
					label="Location: "
					onChange={handleChange}
				/>
			</div>
			<div className="input-field">
				<DropdownList
					dropdownListItemsKeyValue={defaultWorkerRoles}
					dropdownName="role"
					value={workerInformation.role}
					label="Role: "
					onChange={handleChange}
				/>
			</div>
			<hr />
			<div className="input-field">
				<TextInputField
					name="firstName"
					value={workerInformation.firstName}
					label="First Name: "
					onChange={handleChange}
				/>
			</div>
			<div className="input-field">
				<TextInputField
					name="lastName"
					value={workerInformation.lastName}
					label="Last Name: "
					onChange={handleChange}
				/>
			</div>
			<hr />
			<div className="input-field">
				<TextInputField
					name="email"
					value={workerInformation.email}
					label="Email: "
					onChange={handleChange}
				/>
			</div>
			<div className="input-field">
				<PhoneInputField
					name="phone"
					value={workerInformation.phone}
					label="Contact Number: "
					onChange={handleChange}
				/>
			</div>
			<hr />
			<div className="action-buttons">
				<input
					className="btn btn-primary"
					type="button"
					value="Delete Worker"
					onClick={deleteWorkerAndPushAllWorkerPage}
				/>
				<input
					className="btn btn-primary"
					type="button"
					value="Discard Changes"
					onClick={discardChanges}
				/>
				<input
					className="btn btn-primary"
					type="submit"
					value="Save Changes"
					onClick={saveChangesAndPushWorkerInformationPage}
				/>
			</div>
		</form>
	);
};

export default EditWorkerForm;
