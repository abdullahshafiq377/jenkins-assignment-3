import React, { useEffect, useRef, useState } from 'react';
import Alert from '../components/Alert';
import Input from '../components/Input';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi-browser';
import axiosInstance from '../utils/axiosInstance';
import templateSchema, { templateInitialState } from '../features/templates/utils/templateSchema';
import ComboBox from '../components/ComboBox';
import TextArea from '../components/TextArea';
import SecondaryButton from '../components/SecondaryButton';

const MessagesPage = () => {
	
	const navigate = useNavigate();
	
	const [error, setError] = useState({});
	
	const [response, setResponse] = useState(null);
	const [responseError, setResponseError] = useState(null);
	
	const [templates, setTemplates] = useState([]);
	const [selectedTemplate, setSelectedTemplate] = useState(null);
	const [message, setMessage] = useState({...templateInitialState});
	const [file, setFile] = useState(null);
	
	
	const getTemplateData = () => {
		try {
			axiosInstance.get('/user/alltemplates')
			             .then((response) => {
				             console.log(response);
				             if (response.status >= 200) {
					             console.log(response.data.templates);
					             setTemplates(response.data.templates);
					             setError(null);
				             }
			             })
			             .catch(error => {
				             console.log(error);
				             setError(error);
			             });
		} catch (e) {
			console.log(e);
			setError(e);
		}
	};
	useEffect(() => {
		getTemplateData();
	}, []);
	useEffect(() => {
		setMessage({title: selectedTemplate?.title, message: selectedTemplate?.message});
	}, [selectedTemplate]);
	
	const validateForm = (e) => {
		e.preventDefault();
		
		const result = Joi.validate(message, templateSchema, {abortEarly: false});
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
			console.log(error);
			setError(errorData);
			return errorData;
		}
	};
	
	const handleSave = (e) => {
		const {name, value} = e.target;
		let errorData = {...error};
		const errorMessage = validateProperty(e);
		if (errorMessage) {
			errorData[name] = errorMessage;
		}
		else {
			delete errorData[name];
		}
		let userData = {...message};
		userData[name] = value;
		setMessage(userData);
		setError(errorData);
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
		setMessage({
			           ...templateInitialState
		           });
	};
	const postData = () => {
		if (!file) {
			return alert('Please upload an excel file');
		}
		
		const formData = new FormData();
		formData.append('title', message?.title);
		formData.append('message', message?.message);
		formData.append('file', file, file?.name);
		try {
			console.log(message);
			axiosInstance.post('user/uploadFile', formData)
			             .then((res => {
				             console.log(res);
				             if (res.status >= 200) {
					             setResponseError(null);
					             clearState();
					             navigate('/messageResponse', {
						             state: {result: res.data.result, message: message}
					             });
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
	
	const fileInputRef = useRef(null);
	
	const handleFileInput = () => {
		fileInputRef.current.click();
	};
	
	const handleFileChange = e => {
		const fileObj = e.target.files && e.target.files[0];
		if (!fileObj) {
			return null;
		}
		e.target.value = null;
		setFile(fileObj);
	};
	
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-2xl font-semibold leading-6 text-gray-900">Send Message</h1>
					<p className="mt-2 text-sm text-gray-700">
						Please fill in all the required details to send a new message.
					</p>
				</div>
			</div>
			{
				response && (
					<div className="mt-8">
						<Alert type="success" title={response?.name} message={response?.message}/>
					</div>
				)
			}
			{
				responseError && (
					<div className="mt-8">
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
								<div className="w-3/5">
									<ComboBox label="Template" data={templates} selectedElement={selectedTemplate}
									          setSelectedElement={setSelectedTemplate}/>
								</div>
								<Input className="w-3/5" name="title" type="text" label="Title"
								       onChange={handleSave}
								       value={message.title} placeholder="Enter full name" error={error?.title}/>
								<TextArea className="w-3/5" name="message" label="Message"
								          onChange={handleSave}
								          value={message.message} placeholder="Enter Message"
								          error={error?.message}/>
								<div>
									<label
										className="mb-2 block text-sm font-medium leading-6 text-gray-900">File</label>
									<input
										style={{display: 'none'}}
										ref={fileInputRef}
										type="file"
										// accept=""
										onChange={handleFileChange}
									/>
									<p className="my-2 font-medium text-green-600">{file ? file.name : ''}</p>
									<SecondaryButton onClick={handleFileInput}>Upload Excel File</SecondaryButton>
								</div>
								
								<div
									className="mt-4 pt-4 flex items-center justify-end gap-x-6 border-t border-black/20">
									<PrimaryButton
										// disabled={errors?.name || errors?.phone || errors?.pickup || errors?.dropoff}
										type="submit">Send</PrimaryButton>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MessagesPage;
