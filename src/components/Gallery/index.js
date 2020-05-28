import React from 'react';

import { v1 as uuidv1 } from 'uuid';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import ImageContainer from './ImageContainer';

import { getThumbnails } from '../../util/ajax/gallery';
import { bindActionCreators } from 'redux';
import { setCurrentComponent } from '../../actions/common';
import { connect } from 'react-redux';

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.props.setCurrentComponent('main');

    getThumbnails((result) => {
      this.setState({ items: result.data.items });
    });
  }

  render() {
    const { items } = this.state;

    return (
      <Row>
        {items.map((item) => {
          return (
            <Col xs={12} s={12} md={6} lg={4} key={uuidv1()}>
              <ImageContainer thumbnail={item.thumbnail}
                              name={item.name}
                              history={this.props.history}
                              id={item.id} />
            </Col>
          );
        })}
      </Row>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ setCurrentComponent }, dispatch);

export default connect(null, mapDispatchToProps)(Gallery);
