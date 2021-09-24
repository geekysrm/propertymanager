import React from 'react';
import {
	Navbar as NavContainer,
	Container,
	NavbarBrand,
	Nav,
	NavLink,
} from 'react-bootstrap';
import { NavLink as Link } from 'react-router-dom';

import './Navbar.scss';

export default function Navbar() {
	return (
		<NavContainer
			bg="dark"
			variant="dark"
			fixed="top"
			className="navbar-container"
		>
			<Container fluid>
				<NavbarBrand as={Link} to="/">
					Propery Management
				</NavbarBrand>
				<Nav className="ml-auto nav-link-container">
					<NavLink as={Link} to="home">
						Home
					</NavLink>
					<NavLink as={Link} to="register" className="ml-2">
						Register
					</NavLink>
				</Nav>
			</Container>
		</NavContainer>
	);
}
