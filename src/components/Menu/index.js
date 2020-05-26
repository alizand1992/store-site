import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { SITE_NAME } from '../../util/constants/common';
import { connect } from 'react-redux';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      siteName: '',
    }
  }

  componentDidMount() {
    const { properties } = this.props;

    if (properties) {
      this.setSiteName(properties)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.properties === undefined || prevProps.properties !== this.props.properties) {
      this.setSiteName(this.props.properties)
    }
  }

  setSiteName = (properties) => {
    const siteName = properties.filter(prop => prop.name === SITE_NAME)[0].value;
    this.setState({ siteName });
  }

  render() {
    const { siteName } = this.state;
    return (
      <Navbar variant="light" expand="lg">
        <span className="menu-container">
          <Navbar.Brand>
            <h1>{siteName}</h1>
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
            <Nav.Link active={true} href="/">
              <span className="menu-item">Work</span>
            </Nav.Link>
            <Nav.Link><span className="menu-item">Exhibitions</span></Nav.Link>
            <Nav.Link><span className="menu-item">About</span></Nav.Link>
            <Nav.Link><span className="menu-item">Contact</span></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStatesToProps = (state) => ({
  properties: state.common.properties,
});

export default connect(mapStatesToProps)(Menu);