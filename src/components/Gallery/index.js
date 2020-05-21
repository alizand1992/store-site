import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ImageContainer from './ImageContainer';

const images = {
  bowl_1: {
    name: '',
    year: '',
    size: '',
    material: '',
    price: '',
    files: [
      'gallery/bowl_1/01.jpg',
      'gallery/bowl_1/02.jpg',
      'gallery/bowl_1/03.jpg',
      'gallery/bowl_1/04.jpg',
      'gallery/bowl_1/05.jpg',
      'gallery/bowl_1/06.jpg',
    ],
  },
  bowl_2: {
    name: '',
    year: '',
    size: '',
    material: '',
    price: '',
    files: [
      'gallery/bowl_2/01.jpg',
      'gallery/bowl_2/02.jpg',
      'gallery/bowl_2/03.jpg',
      'gallery/bowl_2/04.jpg',
    ],
  },
  bowl_3: {
    name: '',
    year: '',
    size: '',
    material: '',
    price: '',
    files: [
      'gallery/bowl_3/01.jpg',
      'gallery/bowl_3/02.jpg',
    ],
  },
};

class Gallery extends React.Component {
  render() {
    return (
      <Row>
        {Object.values(images).map((item) => {
          return (
            <Col xs={12} s={12} md={6} lg={4}>
              <ImageContainer thumbnail={item.files[0]} />
            </Col>
          );
        })}
      </Row>
    )
  }
}

export default Gallery;