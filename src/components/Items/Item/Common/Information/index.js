import React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { isUserSignedIn } from '../../../../../util/ajax/User';
import { saveItem } from '../../../../../util/ajax/Items/Item/New';
import { getItemWithAttributes } from '../../../../../util/ajax/Items/Item/Show';
import { updateItem } from '../../../../../util/ajax/Items/Item/Edit';

import { LoadingPage } from '../../../../Common/LoadingPage';

class Information extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth_key: props.auth_key,
      name: '',
      show_in_gallery: false,
      redirect: false,
      noPermission: false,
    };
  }

  getItemInformation = (auth_key) => {
    if (auth_key) {
      isUserSignedIn(auth_key, () => {
        const { id } = this.props.match.params;

        if (id) {
          getItemWithAttributes(id, (res) => {
            this.setState({
              auth_key,
              id,
              name: res.data.item.name,
              show_in_gallery: res.data.item.show_in_gallery,
            })
          });
        } else {
          this.setState({ auth_key });
        }
      }, () => {
        this.setState({ redirect: true });
      });
    }
  }

  componentDidMount() {
    const { auth_key } = this.props;

    if (auth_key) {
      this.getItemInformation(auth_key);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { auth_key } = this.props;

    if (prevProps.auth_key !== auth_key) {
      this.getItemInformation(auth_key);
    }
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

  saveItem = () => {
    updateItem(this.state, (res) => {
      this.props.history.push(`/item/new/${res.data.id}/attributes`);
    })
  }

  skip = () => {
    const { id } = this.state;
    this.props.history.push(`/item/new/${id}/attributes`);
  }

  renderButtons = () => {
    const { id } = this.state;

    if (id) {
      return (
        <React.Fragment>
          <Button variant="success" onClick={this.skip}>Skip</Button>
          {' '}
          <Button onClick={this.saveItem}>Update</Button>
        </React.Fragment>
      );
    } else {
      return <Button onClick={this.createItem}>Save</Button>;
    }
  }

  render() {
    const { auth_key, redirect, name, show_in_gallery } = this.state;

    if (redirect) {
      return <Redirect to="/user/sign_in" />;
    }

    if (!auth_key) {
      return <LoadingPage />;
    }

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
            {this.renderButtons()}
          </Col>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  auth_key: state.user.auth_key,
});

export default connect(mapStateToProps)(Information);