import { Row, Col } from 'react-bootstrap';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useWallet } from '@solana/wallet-adapter-react';

import './App.scss';

import Home from './pages/Home';
import Register from './pages/Register';
import Map from './pages/Map/Map';
import NotConnected from './pages/NotConnected';
import UserProfile from './pages/UserProfile';
import AddProperty from './pages/AddProperty';
import PropertyProfile from './pages/PropertyProfile';
import PropertyRequest from './pages/PropertyRequest';

import Navbar from './components/Navbar/Navbar';

function App() {
	const wallet = useWallet();

	return (
		<Router>
			<Navbar></Navbar>
			<div className="app-container" fluid>
				<Row className="h-100">
					<Col className="h-100">
						<Switch>
							<Route path="/home" component={Home} />
							<Route path="/map" component={Map} />
							<Route path="/register" component={Register} />
							<Route path="/user/:id" component={UserProfile} />
							<Route path="/property/request" component={PropertyRequest} />
							<Route path="/property/add" component={AddProperty} />
							<Route path="/property/:id" component={PropertyProfile} />
							<Route path="/not-connected" component={NotConnected} />
							<Redirect
								exact
								from="/"
								to={wallet.connected ? '/home' : '/not-connected'}
							/>
						</Switch>
					</Col>
				</Row>
			</div>
		</Router>
	);
}

export default App;
