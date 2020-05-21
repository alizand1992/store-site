import React from 'react';

import Card from 'react-bootstrap/Card';

class ImageContainer extends React.Component {
  render() {
    const { thumbnail } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={this.props.thumbnail} />
      </Card>
    )
  }
}

export default ImageContainer;