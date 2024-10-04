import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import './home.css'; // External CSS
import logo from '../../assets/TransMate.png';


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
        {/* <Navbar.Toggle aria-controls="navbarScroll" onClick={handleToggleClick} /> */}
        <Navbar.Collapse id="navbarScroll" style={{display:'inline-flex'}}>
        <Navbar.Brand href="/" className="brand-text" >
          <img src={logo} alt="" style={{height:'100px', width:'100px', borderRadius:'50%'}}/>
        </Navbar.Brand>
          <Nav className="nav-links">
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
            <LinkContainer to="/translationList">
              <Nav.Link className="nav-link-custom">
                Recents
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