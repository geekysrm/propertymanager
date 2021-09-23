import { useStoreState } from 'easy-peasy';
import { Row, Col, Container } from 'react-bootstrap';

import TodoInput from './Components/TodoInput/TodoInput';
import TodoList from './Components/TodoList/TodoList';

import './App.scss';

function App() {
	const todos = useStoreState((state) => state.todos);

	return (
		<Container className="app-container p-4">
			<Row className="mb-2">
				<Col>
					<TodoInput></TodoInput>
				</Col>
			</Row>
			<Row>
				<Col className="d-flex flex-column">
					<TodoList todoList={todos}></TodoList>
				</Col>
			</Row>
		</Container>
	);
}

export default App;
