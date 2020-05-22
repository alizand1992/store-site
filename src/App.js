import React from 'react';
import './App.css';

import { connect } from 'react-redux';

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
      currentComponent: props.currentComponent || 'home',
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { currentComponent } = prevProps;
    if (currentComponent) {
      this.fluid(currentComponent)
    }
  }

  fluid = (currentComponent) => {
    const fluidComps = ['item'];

    const { fluid } = this.state;

    if (fluidComps.includes(currentComponent) && fluid === false) {
      this.setState({ fluid: true });
    } else if(!fluidComps.includes(currentComponent) && fluid === true) {
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

const mapStateToProps = (state) => ({
  currentComponent: state.common.currentComponent,
});

export default connect(mapStateToProps)(App);
