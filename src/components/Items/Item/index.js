import React from 'react';

import axios from 'axios';

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
      files: [],
      fields: [],
    }
  }

  componentDidMount() {
    if (this.props.match) {
      const { id } = this.props.match.params;

      if (id) {
        getItem(id, (res) => {
          const { item, images } = res.data;

          images.forEach((image) => {
            const url = image.url.replace('http://localhost:3000', 'http://localhost:5000');
            axios.get(url, {
              responseType: 'blob',
            }).then((res) => {
              const { files } = this.state;
              const file = res.data;

              file.name = image.name

              files.push(file);
              this.setState({ files });
            }).catch((err) => {
              console.log(err);
            });
          });

          this.setState({
            id,
            name: item.name,
            show_in_gallery: item.show_in_gallery,
          });
        });
      }
    }
  }

  onFileDrop = (newFiles) => {
    const { files } = this.state;

    for (let i = 0; i < newFiles.length; i++) {
      files.push(newFiles.item(i));
    }

    this.setState({ files });
  }

  submit = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { files, name, show_in_gallery, fields } = this.state;

    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    })

    formData.append('id', id);
    formData.append('name', name);
    formData.append('show_in_gallery', show_in_gallery);
    formData.append('fields', JSON.stringify(fields));

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

  getFields = (combinedFields) => {
    const { fields, newFields } = combinedFields;

    const updatedFields = Object.values(fields);
    updatedFields.push(...newFields);

    this.setState({ fields: updatedFields });
  }

  render() {
    const { files, name, show_in_gallery } = this.state;
    const { id } = this.props.match.params;

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

            <CustomFields itemId={id} getFields={this.getFields} />

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