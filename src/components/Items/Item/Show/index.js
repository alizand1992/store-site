import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Information from './Information';
import { LoadingPage } from '../../../Common/LoadingPage';
import Images from './Images';
import { DISPLAY_FIELD_NAMES } from '../../../../util/constants/common';
import { connect } from 'react-redux';

class Item extends React.Component {
  constructor(props) {
    super(props);

    let displayFieldNames = true;

    if (this.props.property) {
      displayFieldNames = this.props.properties.filter(prop => prop.name === DISPLAY_FIELD_NAMES)[0].value === '1';
    }

    this.state = {
      id: props.match.params.id,
      displayFieldNames,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps === undefined || prevProps.properties !== this.props.properties) {
      const displayFieldNames = this.props.properties.filter(prop => prop.name === DISPLAY_FIELD_NAMES)[0].value === '1';
      this.setState({ displayFieldNames });
    }
  }

  render() {
    const { id, displayFieldNames } = this.state;

    if (!id) {
      return <LoadingPage />;
    }

    return (
      <React.Fragment>
        <Row className="item-container-sm">
          <Col sm={12}>
            <Information id={id} displayFieldNames={displayFieldNames} />
          </Col>
          <Col sm={12}>
            <Images id={id} />
          </Col>
        </Row>

        <Row className="item-container">
          <Col lg={displayFieldNames ? 8 : 10}>
            <Images id={id} />
          </Col>
          <Col lg={displayFieldNames? 4 : 2}>
            <Information id={id} displayFieldNames={displayFieldNames} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  properties: state.common.properties,
});

export default connect(mapStateToProps)(Item);