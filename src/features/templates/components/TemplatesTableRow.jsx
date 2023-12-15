import React, { useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import ConfirmDeletionModal from '../../../components/ConfirmDeletionModal';

function classNames (...classes) {
	return classes.filter(Boolean)
	              .join(' ');
}

const TemplatesTableRow = ({template, selectedTemplates, setSelectedTemplates, setRefetch}) => {
	const [showConfirmDeletionModal, setShowConfirmDeletionModal] = useState(false);
	const handleDelete = () => {
		axiosInstance.delete(`/user/deleteTemplate/${template._id}`)
		             .then(() => {
			             setShowConfirmDeletionModal(!showConfirmDeletionModal);
			             setRefetch(prev => prev + 1);
		             });
	};
	
	return (
		<tr key={template?._id} className={selectedTemplates.includes(template._id) ? 'bg-gray-50' : undefined}>
			<td className="relative px-7 sm:w-12 sm:px-6">
				{selectedTemplates.includes(template._id) && (
					<div className="absolute inset-y-0 left-0 w-0.5 bg-blue-600"/>
				)}
				<input
					type="checkbox"
					className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
					value={template?._id}
					checked={selectedTemplates.includes(template._id)}
					onChange={(e) =>
						setSelectedTemplates(
							e.target.checked
							? [...selectedTemplates, template._id]
							: selectedTemplates.filter((p) => p !== template._id)
						)
					}
				/>
			</td>
			<td
				className={classNames(
					'whitespace-nowrap py-4 pr-3 text-sm font-medium',
					selectedTemplates.includes(template._id) ? 'text-blue-600' : 'text-gray-900'
				)}
			>
				{template?.title}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{template?.message}</td>
			<td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
				<button onClick={() => setShowConfirmDeletionModal(!showConfirmDeletionModal)}
				        className="text-red-600 hover:text-red-900">
					Delete<span className="sr-only">, {template?.title}</span>
				</button>
			</td>
			<ConfirmDeletionModal title={template.title} setOpen={setShowConfirmDeletionModal}
			                      open={showConfirmDeletionModal} onDelete={handleDelete}/>
		</tr>
	);
};

export default TemplatesTableRow;
