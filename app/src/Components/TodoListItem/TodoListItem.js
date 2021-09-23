import React from 'react';
import { Alert } from 'react-bootstrap';

export default function TodoListItem({ children }) {
	return (
		<Alert variant="light" className="text-center w-100">
			{children}
		</Alert>
	);
}
