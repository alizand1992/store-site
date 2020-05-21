import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Bootstrap
import Container from 'react-bootstrap/Container';

// Components
import Menu from './components/Menu';
import Gallery from './components/Gallery';

function App() {
  return (
    <Router>
      <Container>
        <br />
        <br />
        <Menu />
        <br />
        <Switch>
          <Route path={['/', 'gallery']}>
            <Gallery />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
