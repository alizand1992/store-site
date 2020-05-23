import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import DragAndDrop from '../../../util/DragAndDrop';
import Preview from './Preview';
import Button from 'react-bootstrap/Button';
import { saveItem } from '../../../util/ajax/Item';

class Item extends React.Component {
  constructor(props) {
    super(props);
    props.setFluid(true);

    this.state = {
      fields: [],
      files: [],
      fileList: null,
    }
  }

  onFileDrop = (newFiles) => {
    const { files } = this.state;

    this.setState({ fileList: newFiles });

    for (let i = 0; i < newFiles.length; i++) {
      files.push(newFiles.item(i));
    }

    this.setState({ files });
  }

  submit = (e) => {
    e.preventDefault();

    const filesToSend = []

    this.state.files.forEach((file) => {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = () => {
        filesToSend.push(fileReader.result);
      };
    });

    console.log(this.state.fileList)

    saveItem(this.state.fileList[0], (res) => {
      console.log(res);
    });
  }

  render() {
    const { fields, files } = this.state;

    return (
      <Form>
        <Row>
          <Col lg={6} md={12}>
            <DragAndDrop onFileDrop={this.onFileDrop} />
            <Preview files={files} />
          </Col>
          <Col lg={6} md={12}>
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
            <Row>
              <Col className="text-right">
                <Button onClick={e => this.submit(e)}>Save</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Item;