import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

class Field extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.field.id,
      name: props.field.name,
      value: props.field.value,
      edit: false,
    }
  }

  toggleEdit = (e) => {
    this.setState({ edit: !this.state.edit });
  }

  setName = (e) => {
    const { id, value } = this.state;
    const name = e.target.value

    this.setState({ name });
    this.props.getField({
      id, name, value
    });
  }

  setValue = (e) => {
    const { id, name } = this.state;
    const value = e.target.value;

    this.setState({ value });
    this.props.getField({
      id, name, value
    });
  }

  labelField = () => {
    const { edit, name } = this.state;

    if (edit) {
      return <Form.Control value={name} onChange={this.setName} placeholder="Field Name"/>;
    } else {
      return <Form.Label className="editable" onClick={this.toggleEdit}>{name}:</Form.Label>;
    }
  }

  render() {
    const { value } = this.state;

    return (
      <div>
        <Row className="field-row">
          <Col sm={12}>
            {this.labelField()}
            <Form.Control value={value} onChange={this.setValue} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Field;