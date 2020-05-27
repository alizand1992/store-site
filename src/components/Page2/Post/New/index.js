import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { savePost } from '../../../../util/ajax/Post';

class New extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      active: false,
      errors: [],
    };
  }


  setTitle = (e) => {
    this.setState({
      title: e.target.value,
      errors: [],
    });
  }

  setPublish = () => {
    this.setState({ active: !this.state.active });
  }

  setBody = (e) => {
    this.setState({ body: e.target.value });
  }

  save = () => {
    const { title, active, body } = this.state;

    if (title.trim() === '') {
      this.setState({ errors: ['Title is required.'] })
      return;
    }

    savePost({ title, active, body }, (res) => {

    });
  }

  render() {
    const { errors, title, active, body } = this.state;

    return (
      <Form>
        {errors.length !== 0 &&
          <Row>
            <Col lg={{ span: 8, offset: 2}} md={12}>
              <Alert variant="danger">
                {errors.map((err) => {
                  return (
                    <React.Fragment>
                      <span>{err}</span>
                      <br />
                    </React.Fragment>
                  );
                })}
              </Alert>
            </Col>
          </Row>
        }
        <Row>
          <Col lg={{ span: 8, offset: 2}} md={12}>
            <Form.Label>Title:</Form.Label>
            <Form.Control value={title} placeholder="Title" onChange={this.setTitle} />
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 8, offset: 2}} md={12} style={{ marginTop: '10px' }}>
            <Form.Check checked={active} label="Publish on save!" onChange={this.setPublish} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={{ span: 8, offset: 2}} md={12}>
            <Form.Label>Content:</Form.Label>
            <Form.Control value={body} as="textarea" rows={8} onChange={this.setBody} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={{ span: 8, offset: 2}} md={12} className="text-right">
            <Button onClick={this.save}>Save</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default New;