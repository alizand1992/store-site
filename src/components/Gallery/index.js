import React from 'react';

import { v1 as uuidv1 } from 'uuid';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import ImageContainer from './ImageContainer';

import { getThumbnails } from '../../util/ajax/gallery';

const images = {
  bowl_1: {
    name: 'Bowl 1',
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
    name: 'Bowl 2',
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
    name: 'Bowl 3',
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
  componentDidMount() {
    getThumbnails();
  }

  render() {
    return (
      <Row>
        {Object.values(images).map((item) => {
          return (
            <Col xs={12} s={12} md={6} lg={4} key={uuidv1()}>
              <ImageContainer thumbnail={item.files[0]} name={item.name} />
            </Col>
          );
        })}
      </Row>
    )
  }
}

export default Gallery;
