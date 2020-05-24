import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import CustomFields from './CustomFields';
import DragAndDrop from '../../../util/DragAndDrop';
import Preview from './Preview';

import { getItem, saveItem } from '../../../util/ajax/Item';
import Alert from 'react-bootstrap/Alert';

class Item extends React.Component {
  constructor(props) {
    super(props);
    props.setFluid(true);

    this.state = {
      id: props.match.params.id,
      name: '',
      show_in_gallery: false,
      errors: {},
      inMemoryFiles: [],
      fields: [],
    }
  }

  componentDidMount() {
    const { id } = this.state;

    if (id && !isNaN(id)) {
      getItem(id, (res) => {
        if (res.data.no_content) {
          this.setState({ noContent: true });
        } else {
          const { item } = res.data;

          this.setState({
            id,
            name: item.name,
            show_in_gallery: item.show_in_gallery,
          });
        }
      });
    }
  }

  onFileDrop = (newFiles) => {
    const { inMemoryFiles } = this.state;

    for (let i = 0; i < newFiles.length; i++) {
      inMemoryFiles.push(newFiles.item(i));
    }

    this.setState({ inMemoryFiles });
  }

  submit = (e) => {
    e.preventDefault();
    const { errors, id, inMemoryFiles, name, show_in_gallery, fields } = this.state;

    if (name.trim() === '') {
      errors['name'] = ['Item name is required.'];
      this.setState({ errors });
      return;
    }

    const formData = new FormData();

    inMemoryFiles.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    })

    if (!this.state.noContent && id !== 'new' && id) {
      formData.append('id', id);
    }

    formData.append('name', name);
    formData.append('show_in_gallery', show_in_gallery);
    formData.append('fields', JSON.stringify(fields));

    saveItem(formData, (res) => {
      if (!id) {
        this.props.history.push(`/item/${res.data.id}`)
      }
    });
  }

  handleNameChange = (e) => {
    const { errors } = this.state;
    delete errors.name;

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

  renderErr = () => {
    const { errors } = this.state;

    const values = Object.values(errors)

    if (values.length !== 0) {
      return (
        <Row>
          <Col lg={{ span: 6, offset: 3 }} md={12}>
            <Alert variant="danger">
              {values.map((err) => {
                return err.map(message => <span>{message} <br /></span>);
              })}
            </Alert>
          </Col>
        </Row>
      );
    } else {
      return null;
    }
  }

  render() {
    const { id, inMemoryFiles, name, show_in_gallery } = this.state;

    return (
      <Form>
        {this.renderErr()}
        <Row>
          <Col lg={6} md={12}>
            <DragAndDrop onFileDrop={this.onFileDrop} />
            <Preview itemId={id} inMemoryFiles={inMemoryFiles} />
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