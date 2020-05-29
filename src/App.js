import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Bootstrap
import Container from 'react-bootstrap/Container';

// Components
import Menu from './components/Menu';
import SiteProperties from './components/Common/SiteProperties';
import { PropertyRoutes } from './Routes/Properties';
import { ItemRoutes } from './Routes/Item';
import Items from './components/Items';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import { connect } from 'react-redux';
import { MENU_2 } from './util/constants/common';
import { AboutRoutes } from './Routes/About';
import { PostRoutes } from './Routes/Posts';
import { UserRoutes } from './Routes/User';
import { bindActionCreators } from 'redux';
import { setAuthKey } from './actions/User';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fluid: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('auth_key')) {
      this.props.setAuthKey(localStorage.getItem('auth_key'));
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.properties === undefined || prevProps.properties !== this.props.properties) {
      this.setPage2(this.props.properties)
    }
  }

  setPage2 = (props) => {
    const page2 = props.filter(prop => prop.name === MENU_2)[0].value;
    this.setState({ page2 });
  }

  setFluid = (fluid = false) => {
    this.setState({ fluid })
  }

  render() {
    const { fluid } = this.state;

    return (
      <Router>
        <SiteProperties />
        <Container fluid={fluid}>
          {!fluid &&
            <React.Fragment>
              <br />
              <br />
            </React.Fragment>
          }
          <Menu />
          <br />
          <Switch>
            <Route exact path="/" component={Gallery} />
            <Route path="/items" component={Items} />
            <Route path="/item" component={ItemRoutes} />
            <Route path="/properties" component={PropertyRoutes} />
            <Route path="/about" component={AboutRoutes} />
            <Route path="/contact" component={Contact} />
            <Route path="/posts" component={PostRoutes} />
            <Route path="/user" component={UserRoutes} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

const mapStatesToProps = (state) => ({
  properties: state.common.properties,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ setAuthKey }, dispatch);

export default connect(mapStatesToProps, mapDispatchToProps)(App);