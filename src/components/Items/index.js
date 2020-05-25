import React from 'react';

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Components
import Add from './Add';
import Thumbnail from './Thumbnail';

// Ajax
import { getItems } from '../../util/ajax/Items';

class Items extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    getItems((items) => {
      this.setState({items})
    });
  }

  render() {
    return (
      <Row>
        <Col lg={3} md={4} sm={6} xs={6}>
          <Thumbnail />
        </Col>
        <Col lg={3} md={4} sm={6} xs={6}>
          <Add />
        </Col>
      </Row>
    );
  }
}

export default Items;