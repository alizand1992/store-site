import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { getItem } from '../../../../util/ajax/Item';
import { setName, setShowInGallery } from '../../../../actions/Item';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class GeneralForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
    };
  }

  componentDidMount() {
    const { id } = this.state;

    if (id && !isNaN(id)) {
      getItem(id, (res) => {
        if (res.data.no_content) {
          this.setState({ noContent: true });
        } else {
          const { item } = res.data;

          this.props.setName(item.name);
          this.props.setShowInGallery(item.show_in_gallery)
        }
      });
    }
  }

  handleNameChange = (e) => {
    this.props.setName(e.target.value);
  }

  handleShowInGallery = (e) => {
    let show_in_gallery;
    if (this.props.show_in_gallery === undefined) {
      show_in_gallery = false;
    } else {
      show_in_gallery = !this.props.show_in_gallery;
    }

    this.props.setShowInGallery(show_in_gallery);
  }

  render() {
    const { name, show_in_gallery } = this.props;

    return (
      <Row className="field-row">
        <Col sm={6}>
          <Form.Label>Item Name: </Form.Label>
          <input className="form-control" value={name || ''} onChange={this.handleNameChange} />
        </Col>
        <Col sm={6}>
          <br />
          <Form.Check type="checkbox"
                      label="Show In The Gallery"
                      checked={show_in_gallery || false}
                      onChange={this.handleShowInGallery}
                      style={{ paddingTop: '12px' }} />
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => ({
  name: state.item.name,
  show_in_gallery: state.item.show_in_gallery
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ setName, setShowInGallery}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GeneralForm);