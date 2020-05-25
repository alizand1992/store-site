import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Information from './Information';
import { LoadingPage } from '../../../Common/LoadingPage';
import Images from './Images';

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
            <Information id={id} />
          </Col>
          <Col sm={12}>
            <Images id={id} />
          </Col>
        </Row>

        <Row className="item-container">
          <Col lg={8}>
            <Images id={id} />
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