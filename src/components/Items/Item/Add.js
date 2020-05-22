import React from 'react';

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

class Add extends React.Component {
  render() {
    return (
      <Link to="/item">
        <Button variant="outline-primary" className="add">
          <i className="material-icons md-48">add</i>
        </Button>
      </Link>
    );
  }
}

export default Add;