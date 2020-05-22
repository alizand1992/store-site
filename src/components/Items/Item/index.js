import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentComponent } from '../../../actions/common';

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: []
    }
  }

  componentDidMount() {
    document.ondrop = (e) => {
      e.preventDefault();
      this.drop(e)
    }

    this.props.setCurrentComponent('item');
  }

  drop = (e) => {
    e.preventDefault();
    console.log('drop', e.dataTransfer.files)
  }

  drag = (e) => {
    e.preventDefault();

    this.setState()
  }

  render() {
    const { fields } = this.state;

    return (
      <Row>
        <Col lg={6} md={12}>
          <div onDropCapture={(e) => this.drag(e, 'drop capture')}
               onDrop={(e) => this.drop(e)}
               onDragOver={(e) => this.drag(e)}
               onDragEnter={(e) => this.drag(e)}
               className="drop-zone" id="item-drop-zone">
            <i className="material-icons md-64">archive</i><br />
            Drag and Drop you images or click to upload
          </div>
          <div>
            preview
          </div>
        </Col>
        <Col lg={6} md={12}>
          <Form>
            <Row className="field-row">
              <Col sm={6}>
                <Form.Label>Item Name: </Form.Label>
                <Form.Control />
              </Col>
              <Col sm={6}>
                <br />
                <Form.Check type="checkbox" label="Show In The Gallery" style={{ paddingTop: '12px' }} />
              </Col>
            </Row>

            {fields.map((field) => {
              const { label, value} = field;

              return (
                <Row className="field-row">
                  <Col sm={6}>
                    <Form.Label>
                      {label}
                    </Form.Label>
                  </Col>
                  <Col sm={6}>
                    <Form.Control value={value} />
                  </Col>
                </Row>
              );
            })}

            <Row className="field-row">
              <Col sm={6}>
                <Form.Label>Field Name</Form.Label>
                <Form.Control />
              </Col>
              <Col sm={6}>
                <Form.Label>Value</Form.Label>
                <Form.Control />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ setCurrentComponent }, dispatch);

export default connect(null, mapDispatchToProps)(Item);