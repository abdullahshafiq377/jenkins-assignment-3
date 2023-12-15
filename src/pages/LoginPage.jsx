import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Alert from '../components/Alert';

export default function LoginPage () {
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		                                               user: 'Admin',
		                                               password: ''
	                                               });
	const [responseError, setResponseError] = useState(null);
	
	const handleChange = (e) => {
		const {name, value} = e.target;
		setCredentials(prevState => ({...prevState, [name]: value}));
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(credentials);
		postData();
		// navigate('dashboard');
	};
	
	const clearState = () => {
		setCredentials({
			               user: 'Admin',
			               password: ''
		               });
	};
	
	const postData = () => {
		try {
			// console.log(credentials);
			axiosInstance.post('user/adminlogin', credentials)
			             .then((res => {
				             console.log(res);
				             if (res.status >= 200) {
					             setResponseError(null);
					             clearState();
					             navigate('dashboard');
				             }
			             }))
			             .catch(error => {
				             console.log(error);
				             setResponseError(error);
			             });
		} catch (e) {
			console.log(e);
			setResponseError(e);
		}
	};
	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						className="mx-auto h-10 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600"
						alt="Your Company"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Sign in to your account
					</h2>
				</div>
				
				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					{
						responseError && (
							<div className="mb-4">
								<Alert type="error" title={responseError?.name}
								       message={responseError?.response?.data
								                ? responseError?.response?.data
								                : responseError?.message}/>
							</div>
						)
					}
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div>
							<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
								Username
							</label>
							<div className="mt-2">
								<input
									id="user"
									name="user"
									type="text"
									value={credentials.user}
									onChange={handleChange}
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						
						<div>
							<div className="flex items-center justify-between">
								<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
									Password
								</label>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									value={credentials.password}
									onChange={handleChange}
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						
						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
							>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
