import React from 'react';
import Card from 'react-bootstrap/Card';
import Figure from 'react-bootstrap/Figure';

class Thumbnail extends React.Component {
  render() {
    return (
      <Card>
        <Card.Img src="gallery/bowl_1/01.jpg" />
        <Card.Body>
          <Card.Text className="text-center">
            Bowl 1
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Thumbnail;