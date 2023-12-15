import React from 'react';

const SecondaryButton = (
	{
		type = 'button',
		onClick,
		className,
		disabled = false,
		children
	}
) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:text-gray-400 disabled:bg-white ${className}`}
		>
			{children}
		</button>
	);
};

export default SecondaryButton;
