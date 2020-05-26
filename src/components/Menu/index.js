import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { SITE_NAME, MENU_1, MENU_2 } from '../../util/constants/common';
import { connect } from 'react-redux';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      [SITE_NAME]: '',
      [MENU_1]: '',
      [MENU_2]: '',
    };
  }

  componentDidMount() {
    const { properties } = this.props;

    if (properties) {
      this.setSiteName(properties)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.properties === undefined || prevProps.properties !== this.props.properties) {
      this.setProps(this.props.properties)
    }
  }

  setProps = (properties) => {
    const values = properties.map((prop) => {
      if ([SITE_NAME, MENU_1, MENU_2].includes(prop.name)) {
        return { [prop.name]: prop.value };
      }
    }).filter(value => value !== undefined);

    const state = {};
    values.forEach((val) => {
      const current = Object.entries(val)[0]
      state[current[0]] = current[1];
    });

    this.setState({
      ...state,
    });
  }

  render() {
    const { SITE_NAME, MENU_1, MENU_2 } = this.state;

    return (
      <Navbar variant="light" expand="lg">
        <span className="menu-container">
          <Navbar.Brand>
            <h1>{SITE_NAME}</h1>
          </Navbar.Brand>
        </span>
        <span className="menu-container">
          <Navbar.Toggle aria-controls="menu" />
        </span>

        <span className="menu-container-xs">
          <Navbar.Brand>
            <h1>{SITE_NAME}</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="menu" />
        </span>
        <Navbar.Collapse id="menu">
          <Nav className="ml-auto">
            <Nav.Link active={true} href="/">
              <span className="menu-item">{MENU_1}</span>
            </Nav.Link>
            <Nav.Link href={`/${MENU_2}`}><span className="menu-item">{MENU_2}</span></Nav.Link>
            <Nav.Link href="/about"><span className="menu-item">About</span></Nav.Link>
            <Nav.Link href="/contact"><span className="menu-item">Contact</span></Nav.Link>
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