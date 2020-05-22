import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: []
    }
  }

  render() {
    const { fields } = this.state;

    return (
      <Form>
        {fields.map((field) => {
          const { label, value} = field;

          return (
            <Row>
              <Col lg={{ span: 3, offset: 3 }} md={6} xs={6}>
                <Form.Label>
                  {label}
                </Form.Label>
              </Col>
              <Col lg={3} md={6} xs={6}>
                <Form.Control />
              </Col>
            </Row>
          );
        })}

        <Row>
          <Col lg={{ span: 3, offset: 3 }} md={6} xs={6}>
            <Form.Label>Field Name</Form.Label>
            <Form.Control />
          </Col>
          <Col lg={3} md={6} xs={6}>
            <Form.Label>Value</Form.Label>
            <Form.Control />
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Item