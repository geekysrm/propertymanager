import React, { useState } from 'react';
import { useStoreActions } from 'easy-peasy';

import { FormControl, Form, Button, Row, Col } from 'react-bootstrap';

export default function TodoInput() {
	const addTodo = useStoreActions((actions) => actions.addTodo);
	const [todo, setTodo] = useState('');

	function handleOnSubmit(e) {
		e.preventDefault();
		addTodo(todo);
		setTodo('');
	}

	function handleOnChange(e) {
		setTodo(e.target.value);
	}

	return (
		<Form onSubmit={handleOnSubmit}>
			<Row>
				<Col xs="10">
					<FormControl
						value={todo}
						type="text"
						className="col-8"
						placeholder="Enter Todo Item Here!!!"
						onChange={handleOnChange}
					></FormControl>
				</Col>
				<Col xs="2" className="d-flex">
					<Button className="mx-auto" type="submit">
						Add Todo
					</Button>
				</Col>
			</Row>
		</Form>
	);
}
