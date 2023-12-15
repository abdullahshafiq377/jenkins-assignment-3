import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import UsersTable from '../features/users/components/UsersTable';
import axiosInstance from '../utils/axiosInstance';
import Alert from '../components/Alert';
import { Link } from 'react-router-dom';
import ConfirmDeletionModal from '../components/ConfirmDeletionModal';

export default function UsersPage () {
	const checkbox = useRef();
	const [checked, setChecked] = useState(false);
	const [indeterminate, setIndeterminate] = useState(false);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [refetch, setRefetch] = useState(0);
	const [openConfirmDeletionModal, setOpenConfirmDeletionModal] = useState(false);
	const getUserData = () => {
		try {
			setIsLoading(true);
			axiosInstance.get('/user/allusers')
			             .then((response) => {
				             console.log(response);
				             if (response.status >= 200) {
					             console.log(response.data.users);
					             setUsers(response.data.users);
					             setError(null);
					             setIsLoading(false);
				             }
			             })
			             .catch(error => {
				             console.log(error);
				             setError(error);
				             setIsLoading(false);
			             });
		} catch (e) {
			console.log(e);
			setError(e);
			setIsLoading(false);
		}
	};
	
	const bulkDelete = () => {
		console.log(selectedUsers);
		try {
			axiosInstance.delete('/user/bulkDelete', {data: {ids: selectedUsers}})
			             .then((response) => {
				             console.log(response);
				             if (response.status >= 200) {
					             setRefetch(prevState => prevState + 1);
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
		setOpenConfirmDeletionModal(!openConfirmDeletionModal);
	};
	
	useEffect(() => {
		getUserData();
	}, [refetch]);
	
	useLayoutEffect(() => {
		const isIndeterminate = selectedUsers.length > 0 && selectedUsers.length < users.length;
		setChecked(selectedUsers.length === users.length);
		setIndeterminate(isIndeterminate);
		checkbox.current.indeterminate = isIndeterminate;
	}, [selectedUsers, users]);
	
	function toggleAll () {
		setSelectedUsers(checked || indeterminate ? [] : users?.map(u => (u._id)));
		setChecked(!checked && !indeterminate);
		setIndeterminate(false);
	}
	
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-2xl font-semibold leading-6 text-gray-900">Users</h1>
					<p className="mt-2 text-sm text-gray-700">
						A list of all the users in your account including their name, title, email and role.
					</p>
				</div>
				<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
					<Link
						to="add"
						className="block rounded-md bg-blue-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
					>
						Add user
					</Link>
				</div>
			</div>
			{
				error && (
					<div className="mt-10">
						<Alert type="error" title={error?.name} message={error?.message}/>
					</div>
				)
			}
			<div className="mt-10 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<div className="relative">
							{selectedUsers.length > 0 && (
								<div
									className="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
									<button
										type="button"
										onClick={() => setOpenConfirmDeletionModal(!openConfirmDeletionModal)}
										className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
									>
										Delete all
									</button>
								</div>
							)}
							<UsersTable users={users} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}
							            checkbox={checkbox} checked={checked} toggleAll={toggleAll}
							            isLoading={isLoading} setRefetch={setRefetch}/>
						</div>
					</div>
				</div>
			</div>
			<ConfirmDeletionModal title="Selected Users" onDelete={bulkDelete} open={openConfirmDeletionModal}
			                      setOpen={setOpenConfirmDeletionModal}/>
		</div>
	);
}
