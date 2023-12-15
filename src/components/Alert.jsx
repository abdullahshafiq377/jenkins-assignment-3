import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/20/solid';

export default function Alert ({title, message, type}) {
	let config;
	switch (type) {
		case 'error':
			config = {
				bgColor: 'bg-red-50',
				iconColor: 'text-red-400',
				titleColor: 'text-red-800',
				messageColor: 'text-red-700',
				icon: XCircleIcon,
			};
			break;
		case 'warning':
			config = {
				bgColor: 'bg-yellow-50',
				iconColor: 'text-yellow-400',
				titleColor: 'text-yellow-800',
				messageColor: 'text-yellow-700',
				icon: ExclamationTriangleIcon,
			};
			break;
		case 'success':
			config = {
				bgColor: 'bg-green-50',
				iconColor: 'text-green-400',
				titleColor: 'text-green-800',
				messageColor: 'text-green-700',
				icon: CheckCircleIcon,
			};
			break;
		default:
			config = {
				bgColor: 'bg-red-50',
				iconColor: 'text-red-400',
				titleColor: 'text-red-800',
				messageColor: 'text-red-700',
				icon: XCircleIcon,
			};
			break;
	}
	return (
		<div className={`rounded-md p-4 ${config.bgColor}`}>
			<div className="flex">
				<div className="flex-shrink-0">
					<config.icon className={`h-5 w-5 ${config.iconColor}`} aria-hidden="true"/>
				</div>
				<div className="ml-3">
					<h3 className={`text-sm font-medium ${config.titleColor}`}>{title}</h3>
					<div className={`mt-2 text-sm ${config.messageColor}`}>
						<p>
							{message}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
