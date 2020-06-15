import React from 'react';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import { getImage } from '../../../../util/ajax/Preview';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      image: null,
    };
  }

  componentDidMount() {
    const { inMemoryFile } = this.props;

    // Coming from the server
    if (inMemoryFile.url) {
      getImage(inMemoryFile, (blob) => {
        this.fileFromBlob(blob, inMemoryFile);
      });
    } else {
      this.fileFromBlob(inMemoryFile, { name: inMemoryFile.name })
    }
  }

  fileFromBlob = (blob, data) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(blob);
    fileReader.onload = () => {
      this.setState({
        id: data.id,
        name: data.name,
        image: fileReader.result
      });
    }
  }

  info = () => {
    const { name } = this.state;
    let displayName = name.substr(0, 45);

    if (displayName.length !== name.length) {
      displayName += '...';
    }

    return displayName;
  }

  render() {
    const { image } = this.state;
    const { index } = this.props;


    if (!image) {
      return (
        <div className="preview-thumbnail text-center"
             style={{ paddingTop: '40px' }}>
          <Spinner animation="border" />
        </div>
      );
    }

    return (
      <ListGroup.Item>
        <Row>
          <Col lg={6} md={6}>
            <img src={image}
                 height={65}
                 style={{ imageOrientation: 'from-image', marginRight: '20px'}}
                 alt="Item" />
            <b>{this.info()}</b>
          </Col>
          <Col lg={6} md={6} className="text-right" style={{ paddingTop: '15px' }}>
            <Button variant="outline-danger"
                    size="sm"
                    onClick={(e) => {this.props.remove(index)}}
                    style={{ cursor: 'pointer' }}>
              <i className="material-icons" style={{ fontSize: '8pt'}}>clear</i>
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }
}

export default Thumbnail;