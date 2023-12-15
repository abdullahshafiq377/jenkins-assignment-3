import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ResponseTable from '../features/message-response/components/ResponseTable';

const MessageResponsePage = () => {
	const location = useLocation();
	const state = location.state;
	const [result] = useState(state.result);
	const [message] = useState(state.message);
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-2xl font-semibold leading-6 text-gray-900">Message result</h1>
					<p className="mt-6 text-sm font-medium text-gray-700">
						{message.title}
					</p>
					<p className="mt-2 text-sm text-gray-700 w-2/5">
						{message.message}
					</p>
				</div>
				<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
					<Link
						to="/messages"
						className="block rounded-md bg-blue-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
					>
						Back
					</Link>
				</div>
			</div>
			<div className="mt-6 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<div className="relative">
							<ResponseTable response={result}/>
						
						</div>
					</div>
				</div>
			</div>
		</div>
		// <div>
		//  <ResponseTable response={result}/>
		// </div>
	);
};

export default MessageResponsePage;
