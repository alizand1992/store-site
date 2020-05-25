import React from 'react';

import { v1 as uuidv1 } from 'uuid';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import ImageContainer from './ImageContainer';

import { getThumbnails } from '../../util/ajax/gallery';

class Gallery extends React.Component {
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
            <Col xs={12} s={12} md={6} lg={4} key={uuidv1()}>
              <ImageContainer thumbnail={item.thumbnail} name={item.name} />
            </Col>
          );
        })}
      </Row>
    )
  }
}

export default Gallery;
