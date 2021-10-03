import React from 'react';
import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
} from '@chakra-ui/react';

export default function Input({ label, id, name, errorMessage }) {
	return (
		<FormControl isInvalid={form.errors.name && form.touched.name}>
			<FormLabel htmlFor="name">First name</FormLabel>
			<Input {...field} id="name" placeholder="name" />
			{errorMessage && <FormErrorMessage>{form.errors.name}</FormErrorMessage>}
		</FormControl>
	);
}
