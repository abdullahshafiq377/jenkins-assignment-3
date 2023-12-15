import React, { useState } from 'react';
import Input from '../components/Input';
import PrimaryButton from '../components/PrimaryButton';
import Joi from 'joi-browser';
import SecondaryButton from '../components/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import Alert from '../components/Alert';
import templateSchema, { templateInitialState } from '../features/templates/utils/templateSchema';
import TextArea from '../components/TextArea';

const AddTemplatePage = () => {
	const navigate = useNavigate();
	
	const [template, setTemplate] = useState({
		                                         ...templateInitialState
	                                         });
	const [errors, setErrors] = useState({});
	
	const [response, setResponse] = useState(null);
	const [responseError, setResponseError] = useState(null);
	
	const validateForm = (e) => {
		e.preventDefault();
		
		const result = Joi.validate(template, templateSchema, {abortEarly: false});
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
		let templateData = {...template};
		templateData[name] = value;
		setTemplate(templateData);
		setErrors(errorData);
	};
	
	const validateProperty = (e) => {
		const {name, value} = e.target;
		const obj = {[name]: value};
		const subSchema = {[name]: templateSchema[name]};
		const result = Joi.validate(obj, subSchema);
		const {error} = result;
		return error ? error.details[0].message : null;
	};
	
	const clearState = () => {
		setTemplate({
			            ...templateInitialState
		            });
	};
	const postData = () => {
		try {
			console.log(template);
			axiosInstance.post('user/addTemplate', template)
			             .then((res => {
				             console.log(res);
				             if (res.status === 201) {
					             setResponseError(null);
					             setResponse({
						                         name: 'Success',
						                         message: `${template.title} added successfully. (You will be automatically redirected to Templates Page.)`
					                         });
					             clearState();
					             setTimeout(() => navigate('/templates', {replace: true}), 3000);
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
					<h1 className="text-2xl font-semibold leading-6 text-gray-900">Add Template</h1>
					<p className="mt-2 text-sm text-gray-700">
						Please fill in all the required details to add a new template.
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
								<Input className="w-3/5" name="title" type="text" label="Title"
								       onChange={handleSave}
								       value={template.title} placeholder="Enter title" error={errors?.title}/>
								
								<TextArea className="w-3/5" name="message" label="Message"
								          onChange={handleSave}
								          value={template.message} placeholder="Enter Message"
								          error={errors?.message}/>
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

export default AddTemplatePage;
