type FormInputProps = {
	label: string;
	name: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const FormTextarea = ({ label, name, ...rest }: FormInputProps) => {
	return (
		<label>
			<span className="text-sm">{label}</span>
			<textarea
				className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
				name={name}
				{...rest}
			/>
		</label>
	);
};
