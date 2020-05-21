import React from 'react';

import Card from 'react-bootstrap/Card';

class ImageContainer extends React.Component {
  render() {
    const { thumbnail, name } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={thumbnail} />
        <Card.Body>
          <Card.Text className="text-center">{name}</Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default ImageContainer;