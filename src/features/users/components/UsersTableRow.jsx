import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';
import ConfirmDeletionModal from '../../../components/ConfirmDeletionModal';

function classNames (...classes) {
	return classes.filter(Boolean)
	              .join(' ');
}

const UsersTableRow = ({user, selectedUsers, setSelectedUsers, setRefetch}) => {
	const navigate = useNavigate();
	const [showConfirmDeletionModal, setShowConfirmDeletionModal] = useState(false);
	const handleDelete = () => {
		axiosInstance.delete(`/user/delete/${user._id}`)
		             .then(() => {
			             setShowConfirmDeletionModal(!showConfirmDeletionModal);
			             setRefetch(prev => prev + 1);
		             });
	};
	
	return (
		<tr key={user?._id} className={selectedUsers.includes(user._id) ? 'bg-gray-50' : undefined}>
			<td className="relative px-7 sm:w-12 sm:px-6">
				{selectedUsers.includes(user._id) && (
					<div className="absolute inset-y-0 left-0 w-0.5 bg-blue-600"/>
				)}
				<input
					type="checkbox"
					className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
					value={user?._id}
					checked={selectedUsers.includes(user._id)}
					onChange={(e) =>
						setSelectedUsers(
							e.target.checked
							? [...selectedUsers, user._id]
							: selectedUsers.filter((p) => p !== user._id)
						)
					}
				/>
			</td>
			<td
				className={classNames(
					'whitespace-nowrap py-4 pr-3 text-sm font-medium',
					selectedUsers.includes(user._id) ? 'text-blue-600' : 'text-gray-900'
				)}
			>
				{user?.name}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user?.phone}</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user?.pickUp}</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user?.dropOff}</td>
			<td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
				<button onClick={() => navigate(`edit/${user?._id}`, {state: user})}
				        className="text-blue-600 hover:text-blue-900">
					Edit<span className="sr-only">, {user?.name}</span>
				</button>
			</td>
			<td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
				<button onClick={() => setShowConfirmDeletionModal(!showConfirmDeletionModal)}
				        className="text-red-600 hover:text-red-900">
					Delete<span className="sr-only">, {user?.name}</span>
				</button>
			</td>
			<ConfirmDeletionModal title={user.name} setOpen={setShowConfirmDeletionModal}
			                      open={showConfirmDeletionModal} onDelete={handleDelete}/>
		</tr>
	);
};

export default UsersTableRow;
