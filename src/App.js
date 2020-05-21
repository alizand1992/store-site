import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Menu from './components/Menu';
import Gallery from './components/Gallery';

function App() {
  return (
    <Container>
      <br />
      <br />
      <Menu />
      <br />
      <Gallery />
    </Container>
  );
}

export default App;
