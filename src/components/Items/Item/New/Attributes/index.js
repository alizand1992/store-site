import React from 'react';

import { LoadingPage } from '../../../../Common/LoadingPage';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

class Attributes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      newFields: [],
      name: '',
      value: '',
    }
  }

  componentDidMount() {
    this.setState({
      id: this.props.match.params.id,
    });
  }

  handleUpdate = (e, field, index) => {
    const { newFields } = this.state;

    newFields[index] = {
      ...newFields[index],
      [field]: e.target.value,
    };

    const error = newFields.filter(field => field.name.trim() === '').length !== 0;

    this.setState({ newFields, error })
  }

  removeField = (e, index) => {
    const newFields = this.state.newFields.filter((_f, i) => i !== index)

    this.setState({ newFields });
  }

  handleNewField = (e, field) => {
    this.setState({
        [field]: e.target.value.trim()
      },
      () => {
        const { newFields, name, value } = this.state;

        if (field === 'name' || name !== '') {
          const newFieldsWithAdd = newFields.filter(f => f);
          newFieldsWithAdd.push({name, value})
          const error = newFieldsWithAdd.filter(field => field.name.trim() === '').length !== 0;
          this.setState({ error })
        }
      }
    );
  }

  addField = () => {
    const { newFields, name, value } = this.state;

    if (name.trim() === '') {
      this.setState({ error: true });
      return;
    }

    newFields.push({ name, value });

    this.setState({
      newFields,
      name: '',
      value: '',
    });
  }

  saveAttributes = () => {

  }

  render() {
    const { error, newFields, name, value, id } = this.state;

    if (!id) {
      return <LoadingPage />
    }

    const toastStyle = {
      position: 'absolute',
        top: '10px',
        right: '10px',
        width: '250px',
    };

    return (
      <React.Fragment>
        <Toast style={toastStyle}
                onClose={() => this.setState({ error: false })}
                show={error}>
          <Toast.Header><strong className="mr-auto">Error</strong></Toast.Header>
          <Toast.Body>Name cannot be empty!</Toast.Body>
        </Toast>

        {newFields.map((field, index) => {
          const { name, value } = field;

          return (
            <Row className="field-row" key={index}>
              <Col md={{ span: 4, offset: 1 }} sm={5}>
                <Form.Label>Field Name</Form.Label>
                <Form.Control value={name} onChange={e => this.handleUpdate(e, 'name', index)} />
              </Col>
              <Col md={4} sm={5}>
                <Form.Label>Value</Form.Label>
                <Form.Control value={value} onChange={e => this.handleUpdate(e, 'value', index)} />
              </Col>
              <Col md={1} sm={2} className="text-right">
                <br />
                <Button onClick={e => this.removeField(e, index)} variant="danger" style={{ marginTop: '7px'}}>Remove</Button>
              </Col>
            </Row>
          );
        })}
        <Row className="field-row">
          <Col md={{ span: 4, offset: 1 }} sm={5}>
            <Form.Label>Field Name</Form.Label>
            <Form.Control value={name} onChange={e => this.handleNewField(e, 'name')} />
          </Col>
          <Col md={4} sm={5}>
            <Form.Label>Value</Form.Label>
            <Form.Control value={value} onChange={e => this.handleNewField(e, 'value')} />
          </Col>
          <Col md={1} sm={2} className="text-right">
            <br />
            <Button variant="success" style={{ marginTop: '7px'}} onClick={this.addField}>Add</Button>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 4 }} sm={12} className="text-right">
            <Button onClick={this.saveAttributes}>Save</Button>
          </Col>
        </Row>

      </React.Fragment>
    )
  }
}

export default Attributes;