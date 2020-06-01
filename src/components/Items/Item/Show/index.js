import React from 'react';

import { connect } from 'react-redux';

import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Information from './Information';
import Images from './Images';
import { LoadingPage } from '../../../Common/LoadingPage';

import { errorMessages } from '../../../../util/constants/errors';
import { DISPLAY_FIELD_NAMES } from '../../../../util/constants/common';

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      displayFieldNames: false,
      errors: {},
    }
  }

  componentDidMount() {
    const { properties } = this.props;

    if (properties) {
      this.setDisplayFieldName(properties)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.properties === undefined || prevProps.properties !== this.props.properties) {
      this.setDisplayFieldName(this.props.properties)
    }
  }

  setDisplayFieldName = (properties) => {
    const displayFieldNames = properties.filter(prop => prop.name === DISPLAY_FIELD_NAMES)[0].value === '1';
    this.setState({ displayFieldNames });
  }

  noPermission = () => {
    const { errors } = this.state;

    this.setState({
      errors: {
        ...errors,
        noPermission: true
      },
    });
  }

  render() {
    const { id, displayFieldNames, errors } = this.state;

    if (!id) {
      return <LoadingPage />;
    }

    const errs = Object.entries(errors);

    if (errs.length !== 0) {
      return (
        <Row>
          <Col sm={12}>
            <Alert variant="danger" className="text-center">
              {errs.map((pair) => {
                if (pair[1] === false) {
                  return null;
                }

                return (
                  <React.Fragment key={pair[0]}>
                    {errorMessages[pair[0]]} <br />
                  </React.Fragment>
                );
              })}
            </Alert>
          </Col>
        </Row>
      );
    }

    return (
      <React.Fragment>
        <Row className="item-container-sm">
          <Col sm={12}>
            <Information id={id} displayFieldNames={displayFieldNames} noPermission={this.noPermission} />
          </Col>
          <Col sm={12}>
            <Images id={id} noPermission={this.noPermission} />
          </Col>
        </Row>

        <Row className="item-container">
          <Col lg={displayFieldNames ? 8 : 10}>
            <Images id={id} noPermission={this.noPermission} />
          </Col>
          <Col lg={displayFieldNames? 4 : 2}>
            <Information id={id} displayFieldNames={displayFieldNames} noPermission={this.noPermission} />
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