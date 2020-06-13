import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { signUpUser } from '../../../util/ajax/User';
import { setAuthKey } from '../../../actions/User';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirm_password: '',
      errors: [],
    };
  }

  componentDidMount() {
    if (this.props.auth_key) {
      this.props.history.push('/');
    } else if (localStorage.getItem('auth_key')) {
      this.props.setAuthKey(localStorage.getItem('auth_key'));
      this.props.history.push('/');
    }
  }

  handleChange = (e, field) => {
    this.setState({
      [field]: e.target.value.trim(),
    });
  }

  signUp = () => {
    const { email, password, confirm_password } = this.state;

    if (email === '' || password === '', confirm_password === '') {
      this.setState({
        errors: ['All fields are required'],
      });

      return;
    }

    signUpUser({ email, password, confirm_password }, (res) => {
      localStorage.setItem('auth_key', res.headers.authorization);
      localStorage.setItem('show_setup_wizard', false);
      this.props.setAuthKey(res.headers.authorization);
      this.props.history.push('/');
    });
  }

  render() {
    const { email, password, confirm_password, errors } = this.state;

    return (
      <Form>
        {errors.length !== 0 &&
          <Row>
            <Col>
              <Alert variant="danger">
                {errors.map((err, index) => {
                  return (
                    <React.Fragment key={index}>
                      {err} <br />
                    </React.Fragment>
                  );
                })}
              </Alert>
            </Col>
          </Row>
        }
        <Row>
          <Col lg={{ span: 6, offset: 3}} md={{ span: 6, offset: 3}}>
            <Card>
              <Card.Header className="text-center">
                <h3>Sign Up</h3>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control value={email}
                                  onChange={e => this.handleChange(e, 'email')}
                                  placeholder="Email" />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control value={password}
                                  type="password"
                                  onChange={e => this.handleChange(e, 'password')}
                                  placeholder="Password" />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control value={confirm_password}
                                  type="password"
                                  onChange={e => this.handleChange(e, 'confirm_password')}
                                  placeholder="Confirm Password" />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col className="text-right">
                    <Button onClick={this.signUp}>Sign Up</Button>
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

const mapStateToProps = (state) => ({
  auth_key: state.user.auth_key
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ setAuthKey }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);