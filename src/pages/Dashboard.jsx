import React from 'react';
import Cookies from 'js-cookie';

const Dashboard = () => {
	console.log(Cookies.get());
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-2xl font-semibold leading-6 text-gray-900">Dashboard</h1>
					<p className="mt-2 text-sm text-gray-700">
						Iske baary mai sochty hain kuch.
					</p>
				</div>
			</div>
			<div className="mt-10 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						{/*Sochty hain kuch*/}
						<h2 className="text-lg font-semibold leading-6 text-gray-900">Welcome Sir jee</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
