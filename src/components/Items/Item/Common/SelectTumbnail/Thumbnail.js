import React from 'react';
import Col from 'react-bootstrap/Col';
import ImageContainer from '../../../../Gallery/ImageContainer';
import { selectThumbnail } from '../../../../../util/ajax/Items';

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
    };
  }

  setAsThumbnail = () => {
    const { image: { id: image_id }, id} = this.props;

    selectThumbnail(id, image_id, (res) => {
      if (res.status === 200) {
        this.props.thumbnail(image_id);
      }
    });
  }

  render() {
    const { image, selected } = this.props;

    return (
      <Col>
        <ImageContainer thumbnail={image.url}
                        selected={selected}
                        onClick={this.setAsThumbnail}
                        name={image.name}
                        history={this.props.history}
                        id={image.id} />
      </Col>
    )
  }
}

export default Thumbnail;