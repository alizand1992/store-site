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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fluid: false,
    };
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
            <Route path="/items" component={Items} />
            <Route path="/item" component={ItemRoutes} />
            <Route path="/properties" component={PropertyRoutes} />
            {/*<Route path={['/']} component={Gallery} />*/}
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
