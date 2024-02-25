import React, { Component } from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';

function NavBar() {
    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="/">MusicSchool</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="booking">Booking</Nav.Link>
                    <Nav.Link href="admin">Admin</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar;