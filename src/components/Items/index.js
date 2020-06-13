import React from 'react';

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Components
import Add from './Add';
import ImageContainer from '../Gallery/ImageContainer';

// Ajax
import { getThumbnails } from '../../util/ajax/gallery';

class Items extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  componentDidMount() {
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
            <Col lg={3} md={4} sm={6} xs={6} key={item.id}>
              <ImageContainer thumbnail={item.thumbnail}
                              edit={true}
                              name={item.name}
                              history={this.props.history}
                              id={item.id} />
            </Col>
          )
        })}
        <Col lg={3} md={4} sm={6} xs={6}>
          <Add />
        </Col>
      </Row>
    );
  }
}

export default Items;