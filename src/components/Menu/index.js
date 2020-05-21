import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class Menu extends React.Component {
  render() {
    return (
      <Navbar variant="light" expand="lg">
        <span className="menu-container">
          <Navbar.Brand>
            <h1>MEHRNAZ NOBARINIA</h1>
          </Navbar.Brand>
        </span>
        <span className="menu-container">
          <Navbar.Toggle aria-controls="menu" />
        </span>

        <span className="menu-container-xs">
          <Navbar.Brand>
            <h1>MEHRNAZ NOBARINIA</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="menu" />
        </span>
        <Navbar.Collapse id="menu">
          <Nav className="ml-auto">
            <Nav.Link active={true}><span className="menu-item">Work</span></Nav.Link>
            <Nav.Link><span className="menu-item">Exhibitions</span></Nav.Link>
            <Nav.Link><span className="menu-item">About</span></Nav.Link>
            <Nav.Link><span className="menu-item">Contact</span></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Menu;