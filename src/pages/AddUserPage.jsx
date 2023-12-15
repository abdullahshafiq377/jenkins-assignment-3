import React, { useState } from 'react';
import Input from '../components/Input';
import PrimaryButton from '../components/PrimaryButton';
import Joi from 'joi-browser';
import SecondaryButton from '../components/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import Alert from '../components/Alert';
import userSchema, { defaultPassword, userInitialState } from '../features/users/utils/userSchema';

const AddUserPage = () => {
	
	const navigate = useNavigate();
	
	const [user, setUser] = useState({
		                                 ...userInitialState
	                                 });
	const [errors, setErrors] = useState({});
	
	const [response, setResponse] = useState(null);
	const [responseError, setResponseError] = useState(null);
	
	const validateForm = (e) => {
		e.preventDefault();
		
		const result = Joi.validate(user, userSchema, {abortEarly: false});
		console.log(result);
		
		const {error} = result;
		
		if (!error) {
			// console.log(user);
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
		let userData = {...user};
		userData[name] = value;
		setUser(userData);
		setErrors(errorData);
	};
	
	const validateProperty = (e) => {
		const {name, value} = e.target;
		const obj = {[name]: value};
		const subSchema = {[name]: userSchema[name]};
		const result = Joi.validate(obj, subSchema);
		const {error} = result;
		return error ? error.details[0].message : null;
	};
	
	const clearState = () => {
		setUser({
			        ...userInitialState
		        });
	};
	const postData = () => {
		try {
			console.log(user);
			axiosInstance.post('user/addUser', {...user, password: defaultPassword})
			             .then((res => {
				             console.log(res);
				             if (res.status === 201) {
					             setResponseError(null);
					             setResponse({
						                         name: 'Success',
						                         message: `${user.name} added successfully. (You will be automatically redirected to Users Page.)`
					                         });
					             clearState();
					             setTimeout(() => navigate('/users', {replace: true}), 3000);
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
					<h1 className="text-2xl font-semibold leading-6 text-gray-900">Add User</h1>
					<p className="mt-2 text-sm text-gray-700">
						Please fill in all the required details to add a new user.
					</p>
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
						       message={responseError?.response?.data?.errors[0]?.msg
						                ? responseError?.response?.data?.errors[0]?.msg
						                : responseError?.message}/>
					</div>
				)
			}
			<div className="mt-10 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<form onSubmit={validateForm}>
							<div className="grid grid-flow-row auto-rows-max gap-8">
								<Input className="w-3/5" name="name" type="text" label="Full Name"
								       onChange={handleSave}
								       value={user.name} placeholder="Enter full name" error={errors?.name}/>
								<Input className="w-2/5" name="phone" type="text" label="Phone Number"
								       onChange={handleSave}
								       value={user.phone} placeholder="Enter mobile number i.e.3311204070"
								       error={errors?.phone}/>
								<Input className="w-2/5" name="pickup" type="text" label="Pick Up"
								       onChange={handleSave}
								       value={user.pickup} placeholder="Enter pick up address"
								       error={errors?.pickup}/>
								<Input className="w-2/5" name="dropoff" type="text" label="Drop Off"
								       onChange={handleSave}
								       value={user.dropoff} placeholder="Enter drop off address"
								       error={errors?.dropoff}/>
								<div
									className="mt-4 pt-4 flex items-center justify-end gap-x-6 border-t border-black/20">
									<SecondaryButton onClick={() => navigate(-1)}>Cancel</SecondaryButton>
									<PrimaryButton
										disabled={errors?.name || errors?.phone || errors?.pickup || errors?.dropoff}
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

export default AddUserPage;
