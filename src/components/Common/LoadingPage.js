import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

export const LoadingPage = () => {
  return (
    <Row>
      <Col md={12} className="text-center">
        <Spinner animation="border" /> <br />
        Loading...
      </Col>
    </Row>
  )
}