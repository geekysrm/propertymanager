import React from 'react';
import { FormControl, FormLabel, FormGroup, FormText } from 'react-bootstrap';

export default function Input({
	value,
	type,
	name,
	placeholder,
	label,
	controlId,
	formText,
	errors,
	onHandleChange,
	className,
}) {
	return (
		<FormGroup controlId={controlId} className={className}>
			<FormLabel className="bold">{label}</FormLabel>
			<FormControl
				type={type}
				placeholder={placeholder}
				onChange={(event) => onHandleChange(event.target.value)}
				name={name}
				value={value}
			></FormControl>
			{formText && <FormText className="text-muted">{formText}</FormText>}
			{errors?.map((error) => (
				<FormText className="text-danger">{error}</FormText>
			))}
		</FormGroup>
	);
}
