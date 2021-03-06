import React from 'react';

import './menu.css';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { SITE_NAME, MENU_1, MENU_2 } from '../../util/constants/common';
import { connect } from 'react-redux';
import NavDropdown from 'react-bootstrap/NavDropdown';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth_key: props.auth_key,
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
    const { auth_key, currentComponent, properties } = this.props;

    if (properties && (prevProps.properties === undefined || prevProps.properties !== properties)) {
      this.setProps(properties)
    }

    if (currentComponent && currentComponent !== prevProps.currentComponent) {
      this.setState({ currentComponent })
    }

    if (auth_key !== prevProps.auth_key) {
      this.setState({ auth_key });
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

  accountButton = () => {
    return (
      <span className="menu-item">
        <i className="material-icons md-32">
          account_circle
        </i>
      </span>
    );
  }

  render() {
    const { auth_key, currentComponent, SITE_NAME, MENU_1, MENU_2 } = this.state;

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
            <Nav.Link active={currentComponent === 'main'} href="/">
              <span className="menu-item">{MENU_1}</span>
            </Nav.Link>
            <Nav.Link active={currentComponent === 'posts'} href="/posts"><span className="menu-item">{MENU_2}</span></Nav.Link>
            <Nav.Link active={currentComponent === 'about'} href="/about"><span className="menu-item">About</span></Nav.Link>
            <Nav.Link active={currentComponent === 'contact'} href="/contact"><span className="menu-item">Contact</span></Nav.Link>
            <NavDropdown title={this.accountButton()} id="account-dropdown" alignRight>
              {!auth_key && <NavDropdown.Item href="/user/sign_in">Sign In</NavDropdown.Item>}
              {auth_key &&
                <React.Fragment>
                  <NavDropdown.Item href="/items/">Items</NavDropdown.Item>
                  <NavDropdown.Item href="/item/new">Add Item</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/posts/list">Posts</NavDropdown.Item>
                  <NavDropdown.Item href="/posts/new">Add Post</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/properties/edit">Settings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/user/sign_out">Sign Out</NavDropdown.Item>
                </React.Fragment>
              }
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStatesToProps = (state) => ({
  properties: state.common.properties,
  currentComponent: state.common.currentComponent,
  auth_key: state.user.auth_key,
});

export default connect(mapStatesToProps)(Menu);