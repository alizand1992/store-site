import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class NewFields extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newFields: [],
      name: '',
      value: '',
    };
  }

  fieldsWithAdd = (newFields) => {
    const {name, value} = this.state;

    if (name.trim() !== '') {
      newFields.push({ name, value });
    }

    return newFields;
  }

  handleUpdate = (e, field, index) => {
    const { newFields } = this.state;

    newFields[index] = {
      ...newFields[index],
      [field]: e.target.value,
    };

    this.setState({ newFields })

    this.props.getFields(this.fieldsWithAdd(newFields));
  }

  removeField = (e, index) => {
    const newFields = this.state.newFields.filter((_f, i) => i !== index)

    this.setState({ newFields });

    this.props.getFields(this.fieldsWithAdd(newFields));
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
          this.props.getFields(newFieldsWithAdd);
        }
      }
    );


  }

  addField = () => {
    const { newFields, name, value } = this.state;

    newFields.push({ name, value });

    this.setState({
      newFields,
      name: '',
      value: '',
    });

    this.props.getFields(newFields);
  }

  render() {
    const { newFields, name, value } = this.state;

    return (
      <React.Fragment>
        {newFields.map((field, index) => {
          const { name, value } = field;

          return (
            <Row className="field-row" key={index}>
              <Col sm={5}>
                <Form.Label>Field Name</Form.Label>
                <Form.Control value={name} onChange={e => this.handleUpdate(e, 'name', index)} />
              </Col>
              <Col sm={5}>
                <Form.Label>Value</Form.Label>
                <Form.Control value={value} onChange={e => this.handleUpdate(e, 'value', index)} />
              </Col>
              <Col sm={2} className="text-right">
                <br />
                <Button onClick={e => this.removeField(e, index)} variant="danger" style={{ marginTop: '7px'}}>Remove</Button>
              </Col>
            </Row>
          );
        })}
        <Row className="field-row">
          <Col sm={5}>
            <Form.Label>Field Name</Form.Label>
            <Form.Control value={name} onChange={e => this.handleNewField(e, 'name')} />
          </Col>
          <Col sm={5}>
            <Form.Label>Value</Form.Label>
            <Form.Control value={value} onChange={e => this.handleNewField(e, 'value')} />
          </Col>
          <Col sm={2} className="text-right">
            <br />
            <Button variant="success" style={{ marginTop: '7px'}} onClick={this.addField}>Add</Button>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default NewFields;