import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { saveProperties } from '../../../util/ajax/Properties';
import { setSiteProperties } from '../../../actions/common';

import { LoadingPage } from '../../Common/LoadingPage';
import { getSiteProperties } from '../../../util/ajax/Common';

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      properties: props.properties,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps === undefined || prevProps.properties !== this.props.properties) {
      this.setState({ properties: this.props.properties });
    }

    if (prevProps.auth_key !== this.props.auth_key) {
      this.setState({ auth_key: this.props.auth_key });
    }
  }

  componentDidMount() {
    const { properties } = this.props;

    if (properties) {
      this.setState({ properties })
    }
  }

  updatePropertyValue = (e, id) => {
    const { properties } = this.state;

    for (let i = 0; i < properties.length; i++) {
      if (properties[i].id === id) {
        if (properties[i].value_type) {
          properties[i].value = properties[i].value === '1' ? '0' : '1';
        } else {
          properties[i].value = e.target.value;
        }

        properties[i].dirty = true;
        break;
      }
    }

    this.setState({ properties })
  }

  submit = () => {
    this.setState({ loading: true });
    const { properties } = this.state;
    const toSend = properties.filter(prop => prop.dirty);

    if (toSend.length === 0) {
      this.setState({ loading: false });
      return;
    }

    saveProperties(toSend, (res) => {
      getSiteProperties((res) => {
        this.props.setSiteProperties(res.data.properties);
        this.setState({ loading: false });
      });
    });
  }

  render() {
    const { auth_key, properties, loading } = this.state;

    if (!properties || loading || !auth_key) {
      return <LoadingPage />
    }

    return (
      <Form>
        <div style={{ height: '70vh', overflowY: 'scroll', overflowX: 'hidden' }}>
          {properties.map((prop) => {
            const { id, description, value, value_type } = prop;

            return (
              <Form.Row key={id}>
                <Col>
                  <Form.Label>{description}</Form.Label>
                </Col>
                <Form.Group as={Col}>
                  {value_type === true
                    ? (<Form.Check checked={value === '1'} onChange={(e) => this.updatePropertyValue(e, id)} />)
                    : (<Form.Control type="text" value={value} placeholder="Value" onChange={(e) => this.updatePropertyValue(e, id)} />)
                  }
                </Form.Group>
              </Form.Row>
            );
          })}
        </div>
        <Row>
          <Col className="text-right">
            <Button onClick={this.submit}>Save</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  auth_key: state.user.auth_key,
  properties: state.common.properties,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ setSiteProperties }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Edit);