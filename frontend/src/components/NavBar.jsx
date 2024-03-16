import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {Link} from 'react-router-dom'

const NavBar = () => {
	return (
		<Navbar style={{fontFamily: "Roboto"}} bg="dark" data-bs-theme="dark">
			<Container fluid>
				<Navbar.Brand as={Link} to="/">
					CryptoRelief 🛟
				</Navbar.Brand>
				<Nav className="me-auto">
				</Nav>
			</Container>
		</Navbar>
	)
}

export default NavBar