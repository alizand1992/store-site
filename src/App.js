import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Bootstrap
import Container from 'react-bootstrap/Container';

// Components
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Items from './components/Items';
import Item from './components/Items/Item/Show';
import Information from './components/Items/Item/New/Information';
import Attributes from './components/Items/Item/New/Attributes';
import Images from './components/Items/Item/New/Images';
import SiteProperties from './components/Common/SiteProperties';

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
            <Route exact path="/item/new/information" component={Information} />
            <Route exact path="/item/new/:id/attributes" component={Attributes} />
            <Route exact path="/item/new/:id/images" component={Images} />
            <Route exact path="/item/:id" component={Item} />
            <Route path={['/', 'gallery']} component={Gallery} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
