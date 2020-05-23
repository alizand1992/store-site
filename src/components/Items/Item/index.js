import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import DragAndDrop from '../../../util/DragAndDrop';
import Preview from './Preview';

class Item extends React.Component {
  constructor(props) {
    super(props);
    props.setFluid(true);

    this.state = {
      fields: [],
      files: [],
    }
  }

  onFileDrop = (newFiles) => {
    const { files } = this.state;

    for (let i = 0; i < newFiles.length; i++) {
      files.push(newFiles.item(i));
    }

    this.setState({ files });
  }

  render() {
    const { fields, files } = this.state;

    return (
      <Row>
        <Col lg={6} md={12}>
          <DragAndDrop onFileDrop={this.onFileDrop} />
          <Preview files={files} />
        </Col>
        <Col lg={6} md={12}>
          <Form>
            <Row className="field-row">
              <Col sm={6}>
                <Form.Label>Item Name: </Form.Label>
                <Form.Control />
              </Col>
              <Col sm={6}>
                <br />
                <Form.Check type="checkbox" label="Show In The Gallery" style={{ paddingTop: '12px' }} />
              </Col>
            </Row>

            {fields.map((field) => {
              const { label, value} = field;

              return (
                <Row className="field-row">
                  <Col sm={6}>
                    <Form.Label>
                      {label}
                    </Form.Label>
                  </Col>
                  <Col sm={6}>
                    <Form.Control value={value} />
                  </Col>
                </Row>
              );
            })}

            <Row className="field-row">
              <Col sm={6}>
                <Form.Label>Field Name</Form.Label>
                <Form.Control />
              </Col>
              <Col sm={6}>
                <Form.Label>Value</Form.Label>
                <Form.Control />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Item;