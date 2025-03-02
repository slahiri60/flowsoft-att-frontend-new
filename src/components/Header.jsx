import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { FaSitemap } from "react-icons/fa6";

const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>ActionTracker</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link href='/login'>
                <FaUser /> Sign In
              </Nav.Link>
              <Nav.Link href='/listactionitems'>
                <FaSitemap /> Action Items
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header