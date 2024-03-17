import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {Link} from 'react-router-dom'

const NavBar = () => {
	return (
		<Navbar style={{fontFamily: "Roboto", fontWeight:"bold"}} bg="dark" data-bs-theme="dark">
			<Container fluid>
				<Navbar.Brand as={Link} to="/">
					CryptoRelief 🛟
				</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link as={Link} to="/campaigns">
						Campaigns
					</Nav.Link>
					<Nav.Link as={Link} to="/admin">
						Admin
					</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	)
}

export default NavBar