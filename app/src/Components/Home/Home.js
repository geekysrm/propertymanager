import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Home.scss';

export default function Home() {
	return (
		<Container className="home-container h-100">
			<Row className="h-100">
				<Col className="h-100 d-flex flex-column justify-content-center align-items-center">
					<h1 className="text-center mb-5">
						Hi, Welcome to your{' '}
						<span className="yellow-accent">Property Manager</span>.
					</h1>
					<h2 className="mb-5 text-center">
						You can <span className="yellow-accent"> keep track </span> of all
						your present and past properties and{' '}
						<span className="yellow-accent">
							carry out property related transaction without any hassle or risk
							of being cheated
						</span>
						. To get started, register yourself in the system by clicking on the
						button below.
					</h2>
					<Button as={Link} to="/register" color="primary">
						Register
					</Button>
				</Col>
			</Row>
		</Container>
	);
}
