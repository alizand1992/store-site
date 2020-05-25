import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import CustomFields from './CustomFields';
import DragAndDrop from '../../../util/DragAndDrop';
import GeneralForm from './GeneralForm';
import Preview from './Preview';

import { saveItem } from '../../../util/ajax/Item';
import Alert from 'react-bootstrap/Alert';
import { connect } from 'react-redux';

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

  onFileDrop = (newFiles) => {
    const { inMemoryFiles } = this.state;

    for (let i = 0; i < newFiles.length; i++) {
      inMemoryFiles.push(newFiles.item(i));
    }

    this.setState({ inMemoryFiles });
  }

  submit = (e) => {
    e.preventDefault();
    const { errors, id, inMemoryFiles, fields } = this.state;
    const { name, show_in_gallery } = this.props;

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

  getFields = (combinedFields) => {
    const { fields, newFields } = combinedFields;

    const updatedFields = Object.values(fields);
    updatedFields.push(...newFields);

    this.setState({ fields: updatedFields });
  }

  getGeneralInfo = (generalInfo) => {
    this.setState({
      name: generalInfo.name,
      show_in_gallery: generalInfo.show_in_gallery,
    })
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
    const { id, inMemoryFiles } = this.state;

    return (
      <Form>

      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.item.name,
  show_in_gallery: state.item.show_in_gallery,
});

export default connect(mapStateToProps)(Item);