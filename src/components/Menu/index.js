import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class Menu extends React.Component {
  render() {
    return (
      <Navbar variant="light">
        <Navbar.Brand>
          <h1>MEHRNAZ NOBARINIA</h1>
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link><span className="menu-item">Work</span></Nav.Link>
          <Nav.Link><span className="menu-item">Exhibition</span></Nav.Link>
          <Nav.Link><span className="menu-item">About</span></Nav.Link>
          <Nav.Link><span className="menu-item">Contact</span></Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default Menu;