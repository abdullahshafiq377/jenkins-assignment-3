import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

function classNames (...classes) {
	return classes.filter(Boolean)
	              .join(' ');
}

export default function TextArea (
	{
		label = 'Label',
		name = 'Name',
		rows = 4,
		className,
		placeholder = 'Placeholder',
		value,
		error,
		onChange,
		onFocus,
		
	}
) {
	return (
		<div className={className}>
			<label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
				{label}
			</label>
			<div className="relative mt-2 rounded-md shadow-sm">
				<textarea
					name={name}
					id={name}
					onChange={onChange}
					onFocus={onFocus}
					rows={rows}
					className={classNames(error ?
					                      'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
					                            :
					                      'text-gray-900 ring-gray-300 placeholder:text-gray-300 focus:ring-blue-500',
					                      'block w-full rounded-md border-0 py-1.5 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6')}
					placeholder={placeholder}
					value={value}
				/>
				{
					error && (
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
							<ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true"/>
						</div>
					)
				}
			</div>
			{
				error && (
					<p className="mt-2 text-sm text-red-600" id="email-error">
						{error}
					</p>
				)
			}
		</div>
	);
}
