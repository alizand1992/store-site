import React from 'react';

import { LoadingPage } from '../../../../Common/LoadingPage';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

import { saveAttributes } from '../../../../../util/ajax/Items/Item/New';
import { getItemWithAttributes } from '../../../../../util/ajax/Items/Item/Show';

const UP = 1;
const DOWN = 0;

class Attributes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: false,
      error: false,
      newFields: [],
      name: '',
      value: '',
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      getItemWithAttributes(id, (res) => {
        console.log(res)
        this.setState({
          id: id,
          newFields: res.data.attrs,
        })
      })
    }
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

  submit = () => {
    const { id, name, value, newFields } = this.state;

    const error = newFields.filter(field => field.name.trim() === '').length !== 0;

    if (error || id === null) {
      this.setState({ error: true });
      return;
    }

    const attrs = newFields.filter(_f => true);

    if (name.trim() !== '') {
      attrs.push({ name, value });
    }

    saveAttributes({ item_id: id, attrs: attrs }, (res) => {
      if (res.data.success) {
        this.props.history.push(`/item/new/${id}/images`);
      }
    });
  }

  swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    return arr;
  }

  reorder = (index, direction) => {
    const { newFields } = this.state;

    if ((direction === UP && index === 0) || (direction === DOWN && index === newFields.length - 1)) {
      return;
    }

    const j = direction === UP ? index - 1 : index + 1;
    newFields[index].order = j;
    newFields[j].order = index

    this.setState({ newFields: this.swap(newFields, index, j) });
  }

  skip = () => {
    const { id } = this.state;
    this.props.history.push(`/item/new/${id}/images`);
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
        <div style={toastStyle}>
          <Toast onClose={() => this.setState({ error: false })}
                 show={error && id}>
            <Toast.Header><strong className="mr-auto">Error</strong></Toast.Header>
            <Toast.Body>Name cannot be empty!</Toast.Body>
          </Toast>
          <Toast onClose={() => this.setState({ error: false })}
                 show={!id}>
            <Toast.Header><strong className="mr-auto">Error</strong></Toast.Header>
            <Toast.Body>There was an error saving attributes!</Toast.Body>
          </Toast>
        </div>

        {newFields.map((field, index) => {
          const { name, value } = field;

          return (
            <Row className="field-row" key={index}>
              <Col md={1}>
                <ButtonGroup vertical>
                  <Button size="small" variant="outline-success" onClick={e => this.reorder(index, UP)}>
                    <i className="material-icons md-16">expand_less</i>
                  </Button>
                  <Button size="small" variant="outline-danger" onClick={e => this.reorder(index, DOWN)}>
                    <i className="material-icons md-16">expand_more</i>
                  </Button>
                </ButtonGroup>
              </Col>
              <Col md={{ span: 4 }} sm={4}>
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
            <Button variant="success" onClick={this.skip}>Skip</Button>
            {' '}
            <Button onClick={this.submit}>Save</Button>
          </Col>
        </Row>

      </React.Fragment>
    )
  }
}

export default Attributes;