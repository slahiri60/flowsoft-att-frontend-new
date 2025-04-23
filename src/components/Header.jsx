import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { FaSitemap } from 'react-icons/fa6';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if user is authenticated when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ActionTracker</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {isAuthenticated ? (
                // Show these options only when user is authenticated
                <NavDropdown
                  title={
                    <>
                      <FaUser /> User Menu
                    </>
                  }
                  id="username"
                >
                  <LinkContainer to="/listactionitems">
                    <NavDropdown.Item>
                      <FaSitemap /> Action Items
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/createactionitem">
                    <NavDropdown.Item>
                      <FaSitemap /> Create Action Item
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={handleSignOut}>
                    <FaSignOutAlt /> Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                // Show these options only when user is NOT authenticated
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaUser /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaUser /> Register
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
