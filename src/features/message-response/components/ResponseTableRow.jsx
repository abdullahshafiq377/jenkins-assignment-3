import React from 'react';


function classNames (...classes) {
	return classes.filter(Boolean)
	              .join(' ');
}

const ResponseTableRow = ({name, phone, status}) => {
	return (
		<tr key={phone}>
			<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
				{name}
			</td>
			<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{phone}</td>
			<td className={classNames('whitespace-nowrap font-medium px-3 py-4 text-sm',
			                          status === 'Notification Sent' ? 'text-green-600' : 'text-red-500')}>{status}</td>
		</tr>
	);
};

export default ResponseTableRow;
