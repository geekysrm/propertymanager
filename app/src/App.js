import { Row, Col, Container } from 'react-bootstrap';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.scss';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Map from './Components/Map/Map';


function App() {
	return (
		<Router>
			<Navbar></Navbar>
			<Container className="app-container" fluid>
				<Row className="h-100">
					<Col className="h-100">
						<Switch>
							<Route path="/home" component={Home} />
							<Route path="/register" component={Register} />
							<Route path="/map" component={Map} />
							<Redirect from="/" to="/home" />
						</Switch>
					</Col>
				</Row>
			</Container>
		</Router>
	);
}

export default App;
