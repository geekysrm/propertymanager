import React from 'react';

import TodoListItem from '../TodoListItem/TodoListItem';

function getTodoItem(todos) {
	return todos.map((item, index) => (
		<TodoListItem key={index}>{item}</TodoListItem>
	));
}

export default function TodoList({ todoList }) {
	return (
		<>
			<h3>Todo List:</h3>
			{getTodoItem(todoList)}
		</>
	);
}
