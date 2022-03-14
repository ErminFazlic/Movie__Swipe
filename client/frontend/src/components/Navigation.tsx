import React from "react"
import { Navbar, Nav, NavLink, Container, } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import logo from '../img/cinema.png'



export const Navigation = () => {
    const username: any = localStorage.getItem('username')
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="/home">
                        <img
                            alt=""
                            src=
                            {logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        MovieSwipe
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink href="/friends">Friends</NavLink>
                            <NavLink href="/likes">Liked Movies</NavLink>
                        </Nav>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Signed in as: <a href="/profile">{username}</a>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Navbar.Collapse>

                </Container>
            </Navbar>

        </>
    );
}

export default Navigation;


