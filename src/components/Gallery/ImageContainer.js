import React from 'react';

import Card from 'react-bootstrap/Card';
import { getImage } from '../../util/ajax/Preview';
import Spinner from 'react-bootstrap/Spinner';

class ImageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail: null,
    };
  }

  componentDidMount() {
    const { thumbnail } = this.props;

    if (thumbnail) {
      getImage({ url: thumbnail }, (blob) => {
        this.fileFromBlob(blob)
      });
    }
  }

  fileFromBlob = (blob) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(blob);
    fileReader.onload = () => {
      this.setState({
        thumbnail: fileReader.result
      });
    }
  }

  loading = () => {
    return (
      <React.Fragment>
        <Card style={{
          display: 'inline-block', width: '250px', height: '250px', textAlign: 'center', paddingTop: '30%',
        }}>
          <Spinner animation="border"></Spinner>
        </Card>
        <br />
      </React.Fragment>
    )
  }

  goToItem = (id) => {
    this.props.history.push(`/item/${id}`);
  }

  render() {
    const { id, name } = this.props;
    const { thumbnail } = this.state;

    if (!thumbnail) {
      return this.loading();
    }

    return (
      <React.Fragment>
        <Card onClick={this.goToItem(id)}>
          <Card.Img variant="top" src={thumbnail} width={250} />
          <Card.Body>
            <Card.Text className="text-center">{name}</Card.Text>
          </Card.Body>
        </Card>
        <br />
      </React.Fragment>
    )
  }
}

export default ImageContainer;