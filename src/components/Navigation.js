import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import React from 'react';

import scissor from '../assets/scissors.png'

const Navigation = () => {
  return (
    <Navbar bg="light" expand="md" fixed="top">
      <Container fluid>
        <Navbar.Brand className='App-logo'>
        <img src={scissor} alt="logo" />
        Platinum
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll"/>
        <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto justify-content-center">
                <Nav.Link href="#about">About</Nav.Link>
                <Nav.Link href="#services">Services</Nav.Link>
                <Nav.Link href="#book">Book</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href="#">Sign in</Nav.Link>
                <Nav.Link eventKey={2} href="#profile">
                Sign up
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation