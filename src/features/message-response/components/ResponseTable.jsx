import React from 'react';
import ResponseTableRow from './ResponseTableRow';

const ResponseTable = ({response}) => {
	return (
		<table className="min-w-full divide-y divide-gray-300">
			<thead>
			<tr>
				<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
					Name
				</th>
				<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
					Phone
				</th>
				<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
					Status
				</th>
			</tr>
			</thead>
			<tbody className="divide-y divide-gray-200">
			{
				Object.keys(response)
				      .map((user) => (
					      <ResponseTableRow key={user} phone={user} name={response[user].name}
					                        status={response[user].status}/>
				      ))
			}
			</tbody>
		</table>
	);
};

export default ResponseTable;
