import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import CustomFields from './CustomFields';
import DragAndDrop from '../../../util/DragAndDrop';
import Preview from './Preview';

import { getItem, saveItem } from '../../../util/ajax/Item';

class Item extends React.Component {
  constructor(props) {
    super(props);
    props.setFluid(true);

    this.state = {
      name: '',
      show_in_gallery: false,
      fields: [],
      newField: {},
      files: [],
      fileList: null,
    }
  }

  componentDidMount() {
    if (this.props.match) {
      const { id } = this.props.match.params;

      if (id) {
        getItem(id, (res) => {
          const { attrs, item } = res.data;

          const fields = [
            {
              name: attrs.name,
              value: attrs.value,
            }
          ];

          this.setState({
            name: item.name,
            show_in_gallery: item.show_in_gallery,
            fields,
          });
        });
      }
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
    const { fileList, name, newField, show_in_gallery } = this.state;

    const formData = new FormData();

    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        formData.append(`file[${i}]`, fileList.item(i));
      }
    }

    formData.append('name', name);
    formData.append('show_in_gallery', show_in_gallery);
    formData.append('new_field', JSON.stringify(newField));

    saveItem(formData, (res) => {
      console.log(res);
    });
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  handleShowInGallery = (e) => {
    const { show_in_gallery } = this.state;
    this.setState({ show_in_gallery: !show_in_gallery });
  }

  handleNewField = (e, attr) => {
    const { newField } = this.state;

    this.setState({
      newField: {
        ...newField,
        [attr]: e.target.value,
      },
    });
  }

  getFields = (fields) => {
    console.log(fields);
  }

  render() {
    const { fields, files, name, show_in_gallery } = this.state;

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
                <Form.Control value={name} onChange={this.handleNameChange} />
              </Col>
              <Col sm={6}>
                <br />
                <Form.Check type="checkbox"
                            label="Show In The Gallery"
                            checked={show_in_gallery}
                            onChange={this.handleShowInGallery}
                            style={{ paddingTop: '12px' }} />
              </Col>
            </Row>

            <CustomFields fields={fields} getFields={this.getFields} />

            <Row className="field-row">
              <Col sm={5}>
                <Form.Label>Field Name</Form.Label>
                <Form.Control onChange={e => this.handleNewField(e, 'name')} />
              </Col>
              <Col sm={5}>
                <Form.Label>Value</Form.Label>
                <Form.Control onChange={e => this.handleNewField(e, 'value')} />
              </Col>
              <Col sm={2} className="text-right">
                <br />
                <Button variant="success" style={{ marginTop: '7px'}}>Add</Button>
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