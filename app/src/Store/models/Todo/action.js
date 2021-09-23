import { action } from 'easy-peasy';

export const todoActions = {
	addTodo: action((state, payload) => {
		state.todos.push(payload);
	}),
};
