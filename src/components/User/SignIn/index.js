import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { signInUser } from '../../../util/ajax/User';
import { bindActionCreators } from 'redux';
import { setAuthKey } from '../../../actions/User';
import { connect } from 'react-redux';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
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
      [field]: e.target.value,
      errors: [],
    });
  }

  signIn = () => {
    const { email, password } = this.state;

    if (email.trim() === '' || password.trim() === '') {
      this.setState({ errors: ['Email or Password cannot be empty!'] });
      return;
    }

    signInUser({ email, password }, (res) => {
      localStorage.setItem('auth_key', res.headers.authorization);
      this.props.setAuthKey(res.headers.authorization);
      this.props.history.push('/');
    });
  }

  render() {
    const { errors, email, password } = this.state;

    return (
      <Form onSubmit={this.signIn}>
        {errors.length !== 0 &&
          <Row>
            <Col lg={{ span: 8, offset: 2 }}>
              <Alert variant="danger">
                {errors.map(err => <React.Fragment>{err}<br/></React.Fragment>)}
              </Alert>
            </Col>
          </Row>
        }
        <Row>
          <Col lg={{ span: 6, offset: 3}} md={{ span: 6, offset: 3}}>
            <Card>
              <Card.Header className="text-center">
                <h3>Sign In</h3>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control value={email} onChange={e => this.handleChange(e, 'email')} />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password"
                                  value={password}
                                  onChange={e => this.handleChange(e, 'password')} />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col className="text-right">
                    <Button onClick={this.signIn}>Sign In</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);