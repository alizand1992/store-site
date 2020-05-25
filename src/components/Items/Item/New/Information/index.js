import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { saveItem } from '../../../../../util/ajax/Items/Item/New';

class Information extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      show_in_gallery: false,
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  handleShowInGallery = () => {
    const { show_in_gallery } = this.state;
    this.setState({ show_in_gallery: !show_in_gallery})
  }

  createItem = () => {
    saveItem(this.state, (res) => {
      this.props.history.push(`/item/new/${res.data.id}/attributes`);
    });
  }

  render() {
    const { name, show_in_gallery } = this.state;

    return (
      <Form>
        <Form.Group as={Row}>
          <Form.Label column md={{ span: 2, offset: 2}}>Item Name: </Form.Label>
          <Col md={6} sm={12}>
            <Form.Control className="form-control" value={name} onChange={this.handleNameChange} />
          </Col>
        </Form.Group>
        <Row>
          <Col md={{ span: 6, offset: 4}} sm={12}>
            <Form.Check type="checkbox"
                        label="Show In The Gallery"
                        checked={show_in_gallery}
                        onChange={this.handleShowInGallery}
                        style={{ paddingTop: '12px' }} />
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 6, offset: 4 }} sm={12} className="text-right">
            <Button onClick={this.createItem}>Save</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Information;