import React from 'react';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class SignUp extends React.Component {
  render() {
    return (
      <Form>
        <Row>
          <Col lg={{ span: 4, offset: 4}}>
            <Card>
              <Card.Header>
                <h3>Sign In</h3>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Check label="Remember Me" />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col className="text-right">
                    <Button>Sign In</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default SignUp;