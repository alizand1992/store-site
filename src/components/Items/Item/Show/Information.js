import React from 'react';
import { getItemWithAttributes } from '../../../../util/ajax/Items/Item/Show';
import { LoadingPage } from '../../../Common/LoadingPage';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Information extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id
    }
  }

  componentDidMount() {
    const { id } = this.props;

    getItemWithAttributes(id, (res) => {
      const { attrs, item: { name } } = res.data;

      this.setState({ name, attrs });
    });
  }

  render() {
    const { id, name, attrs } = this.state;
    const { displayFieldNames } = this.props;

    if (!id || !name) {
      return <LoadingPage />
    }

    return (
      <React.Fragment>
        <Row>
          {displayFieldNames &&
            <Col>
              <h2>Name:</h2>
            </Col>
          }
          <Col>
            <h2>{name}</h2>
          </Col>
        </Row>
        {attrs.map((attr) => {
          return (
            <Row key={attr.id}>
              {displayFieldNames &&
                <Col>
                  {attr.name}:
                </Col>
              }
              <Col>
                {attr.value}
              </Col>
            </Row>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Information;