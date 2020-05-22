import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Bootstrap
import Container from 'react-bootstrap/Container';

// Components
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Items from './components/Items';
import Item from './components/Items/Item';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fluid: false,
    };
  }

  componentDidMount() {
    const activeComponent = 'item';
    const fluidComps = ['item'];

    const { fluid } = this.state;

    if (fluidComps.includes(activeComponent) && fluid === false) {
      this.setState({ fluid: true });
    } else if(!fluidComps.includes(activeComponent) && fluid === true) {
      this.setState({ fluid: false });
    }
  }

  render() {
    const { fluid } = this.state;

    return (
      <Router>
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
            <Route path="/items">
              <Items />
            </Route>
            <Route path={['/item', '/item/:id']}>
              <Item />
            </Route>
            <Route path={['/', 'gallery']}>
              <Gallery />
            </Route>
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
