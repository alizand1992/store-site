import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

class New extends React.Component {
  render() {
    return (
      <Form>
        <Row>
          <Col lg={{ span: 8, offset: 2}} md={12}>
            <Form.Label>Title:</Form.Label>
            <Form.Control placeholder="Title" />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={{ span: 8, offset: 2}} md={12}>
            <Form.Label>Content:</Form.Label>
            <Form.Control as="textarea" rows={8} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={{ span: 8, offset: 2}} md={12} className="text-right">
            <Button>Save</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default New;