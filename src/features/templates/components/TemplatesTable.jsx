import React from 'react';
import TemplatesTableRow from './TemplatesTableRow';

const TemplatesTable = ({
	                        templates, checkbox, checked, toggleAll, selectedTemplates, setSelectedTemplates, isLoading,
	                        setRefetch
                        }) => {
	return (
		<table className="min-w-full table-fixed divide-y divide-gray-300">
			<thead>
			<tr>
				<th scope="col" className="relative px-7 sm:w-12 sm:px-6">
					<input
						type="checkbox"
						className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
						ref={checkbox}
						checked={checked}
						onChange={toggleAll}
					/>
				</th>
				<th scope="col" className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
					Title
				</th>
				<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
					Message
				</th>
				<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
					<span className="sr-only">Delete</span>
				</th>
			</tr>
			</thead>
			<tbody className="divide-y divide-gray-200 bg-white">
			{
				isLoading ? (
					<tr>
						<td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-blue-800">Loading...</td>
					</tr>
				) : (
					templates.length ? (
						                 templates.map((template) => (
							                 <TemplatesTableRow key={template?._id} template={template}
							                                    selectedTemplates={selectedTemplates}
							                                    setSelectedTemplates={setSelectedTemplates} setRefetch={setRefetch}/>
						                 ))
					                 ) :
					(
						<tr>
							<td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-red-600">No Templates
								Found
							</td>
						</tr>
					)
				)
				
			}
			</tbody>
		</table>
	);
};

export default TemplatesTable;
