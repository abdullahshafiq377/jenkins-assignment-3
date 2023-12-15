import React from 'react';

const PrimaryButton = ({
	                       type = 'button',
	                       onClick,
	                       className,
	                       disabled = false,
	                       children
                       }) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${className}`}
		>
			{children}
		</button>
	);
};

export default PrimaryButton;
