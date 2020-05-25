import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Information from './Information';
import { LoadingPage } from '../../../Common/LoadingPage';

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
    }
  }

  render() {
    const { id } = this.state;

    if (!id) {
      return <LoadingPage />;
    }

    return (
      <React.Fragment>
        <Row className="item-container-sm">
          <Col sm={12}>
            Information
          </Col>
          <Col sm={12}>
            Pictures
          </Col>
        </Row>

        <Row className="item-container">
          <Col lg={8}>
            Picture
          </Col>
          <Col lg={4}>
            <Information id={id} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Item;