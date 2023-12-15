import React, { useState } from 'react';
import Alert from '../components/Alert';
import Input from '../components/Input';
import SecondaryButton from '../components/SecondaryButton';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi-browser';
import axiosInstance from '../utils/axiosInstance';
import passwordSchema from '../utils/passwordSchema';

const Settings = () => {
	const navigate = useNavigate();
	
	const [settings, setSettings] = useState({
		                                         password: '',
		                                         newPassword: ''
	                                         });
	const [errors, setErrors] = useState({});
	
	const [response, setResponse] = useState(null);
	const [responseError, setResponseError] = useState(null);
	
	const validateForm = (e) => {
		e.preventDefault();
		
		const result = Joi.validate(settings, passwordSchema, {abortEarly: false});
		console.log(result);
		
		const {error} = result;
		
		if (!error) {
			// console.log(template);
			postData();
		}
		else {
			const errorData = {};
			for (let item of error.details) {
				const name = item.path[0];
				errorData[name] = item.message;
			}
			console.log(errors);
			setErrors(errorData);
			return errorData;
		}
	};
	
	const handleSave = (e) => {
		const {name, value} = e.target;
		let errorData = {...errors};
		const errorMessage = validateProperty(e);
		if (errorMessage) {
			errorData[name] = errorMessage;
		}
		else {
			delete errorData[name];
		}
		let templateData = {...settings};
		templateData[name] = value;
		setSettings(templateData);
		setErrors(errorData);
	};
	
	const validateProperty = (e) => {
		const {name, value} = e.target;
		const obj = {[name]: value};
		const subSchema = {[name]: passwordSchema[name]};
		const result = Joi.validate(obj, subSchema);
		const {error} = result;
		return error ? error.details[0].message : null;
	};
	
	const clearState = () => {
		setSettings({
			            password: '',
			            newPassword: ''
		            });
	};
	const postData = () => {
		try {
			console.log(settings);
			axiosInstance.post('user/updateAdminPass', settings)
			             .then((res => {
				             console.log(res);
				             if (res.status >= 200) {
					             setResponseError(null);
					             setResponse({
						                         name: 'Success',
						                         message: `Password updated successfully.`
					                         });
					             clearState();
					             setTimeout(() => setResponse(null), 5000);
				             }
			             }))
			             .catch(error => {
				             console.log(error);
				             setResponse(null);
				             setResponseError(error);
			             });
		} catch (e) {
			console.log(e);
			setResponse(null);
			setResponseError(e);
		}
	};
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-2xl font-semibold leading-6 text-gray-900">Settings</h1>
				</div>
			</div>
			{
				response && (
					<div className="mt-10">
						<Alert type="success" title={response?.name} message={response?.message}/>
					</div>
				)
			}
			{
				responseError && (
					<div className="mt-10">
						<Alert type="error" title={responseError?.name}
						       message={responseError?.response?.data?.cause
						                ? responseError?.response?.data?.cause
						                : responseError?.message}/>
					</div>
				)
			}
			<div className="mt-10 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<form onSubmit={validateForm}>
							<div className="grid grid-flow-row auto-rows-max gap-8">
								<Input className="w-3/5" name="password" type="password" label="Current Password"
								       onChange={handleSave}
								       value={settings.password} placeholder="Enter current password"
								       error={errors?.password}/>
								<Input className="w-3/5" name="newPassword" type="password" label="New Password"
								       onChange={handleSave}
								       value={settings.newPassword} placeholder="Enter new password"
								       error={errors?.newPassword}/>
								
								<div
									className="mt-4 pt-4 flex items-center justify-end gap-x-6 border-t border-black/20">
									<SecondaryButton onClick={() => navigate(-1)}>Cancel</SecondaryButton>
									<PrimaryButton
										disabled={errors?.title || errors?.message}
										type="submit">Submit</PrimaryButton>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
