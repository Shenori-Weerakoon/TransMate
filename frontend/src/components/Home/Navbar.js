import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import './Navbar.css'; // External CSS


function NavBar({ isAuthenticated, user, logout }) {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggleClick = () => {
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    const navbarCollapse = document.getElementById('navbarScroll');
    if (isToggled) {
      navbarCollapse.style.paddingBottom = '50px';
    } else {
      navbarCollapse.style.marginBottom = '0';
    }
  }, [isToggled]);

  return (
    <Navbar
      expand="lg"
      className={`custom-navbar ${isToggled ? 'navbar-toggled' : ''}`}
    >
      <Container fluid>
        <Navbar.Brand href="/" className="brand-text" >
          TransMate
        </Navbar.Brand>

        {/* <Navbar.Toggle aria-controls="navbarScroll" onClick={handleToggleClick} /> */}
        <Navbar.Collapse id="navbarScroll">
          <Nav className="nav-links" style={{}}>
            <LinkContainer to="/">
              <Nav.Link className="nav-link-custom">
                Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/translator">
              <Nav.Link className="nav-link-custom">
                Translator
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/dictionary">
              <Nav.Link className="nav-link-custom">
                Dictionary
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link className="nav-link-custom login-link">
                Login
              </Nav.Link>
            </LinkContainer>
          </Nav>

          {isAuthenticated && (
            <div className="auth-buttons">
              <button
                className="btn btn-primary"
                onClick={() => window.location.href = '/dashboard'}
              >
                Dashboard
              </button>
              <button
                className="btn btn-danger"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;