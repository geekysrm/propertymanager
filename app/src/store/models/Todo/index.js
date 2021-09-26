import { todoActions } from './action';

export const todoModel = {
	todos: ['Create Store', 'Wrap Application', 'Use Store'],
	...todoActions,
};
